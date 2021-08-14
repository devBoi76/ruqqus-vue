from flask import *
from sqlalchemy import func
import time
import threading
import mistletoe
import re
from ruqqus.classes import *
from ruqqus.helpers.wrappers import *
from ruqqus.helpers.security import *
from ruqqus.helpers.sanitize import *
from ruqqus.helpers.filters import filter_comment_html
from ruqqus.helpers.markdown import *
from ruqqus.helpers.discord import remove_user, set_nick
from ruqqus.helpers.aws import *
from ruqqus.mail import *
from .front import frontlist
from ruqqus.__main__ import app, cache


valid_username_regex = re.compile("^[a-zA-Z0-9_]{3,25}$")
valid_password_regex = re.compile("^.{8,100}$")


@app.route("/settings", methods=["POST"])
@app.route("/api/vue/account/settings", methods=["POST"])
@app.route("/api/v1/settings", methods=["POST"])
@auth_required
@api()
@validate_formkey
def settings_post(v):

    updated = False


###############


    if request.values.get("over18", v.over_18) != v.over_18:
        updated = True
        v.over_18 = request.values.get("over18", None) == 'true'
        cache.delete_memoized(User.idlist, v)



###############



    if request.values.get("hide_offensive", v.hide_offensive) != v.hide_offensive:
        updated = True
        v.hide_offensive = request.values.get("hide_offensive", None) == 'true'
        cache.delete_memoized(User.idlist, v)



###############



    if request.values.get("hide_bot", v.hide_bot) != v.hide_bot:
        updated = True
        v.hide_bot = request.values.get("hide_bot", None) == 'true'
        cache.delete_memoized(User.idlist, v)



###############



    if request.values.get("show_nsfl", v.show_nsfl) != v.show_nsfl:
        updated = True
        v.show_nsfl = request.values.get("show_nsfl", None) == 'true'
        cache.delete_memoized(User.idlist, v)




###############




    if request.values.get("filter_nsfw", v.filter_nsfw) != v.filter_nsfw:
        updated = True
        v.filter_nsfw = not request.values.get("filter_nsfw", None) == 'true'
        cache.delete_memoized(User.idlist, v)



###############



    if request.values.get("private", v.is_private) != v.is_private:
        updated = True
        v.is_private = request.values.get("private", None) == 'true'



###############



    if request.values.get("nofollow", v.is_nofollow) != v.is_nofollow:
        updated = True
        v.is_nofollow = request.values.get("nofollow", None) == 'true'



###############



    if request.values.get("join_chat", v.auto_join_chat) != v.auto_join_chat:
        updated = True
        v.auto_join_chat = request.values.get("join_chat", None) == 'true'



###############



    if request.values.get("bio"):
        bio = request.values.get("bio")[0:256]

        bio=preprocess(bio)

        if bio == v.bio:
            return {"html":lambda:render_template("settings_profile.html",
                                   v=v,
                                   error="You didn't change anything"),
                    "vue":lambda:(jsonify({"error":"You didn't change anything"}), 400),
                    "api":lambda:jsonify({"error":"You didn't change anything"})
                    }

        with CustomRenderer() as renderer:
            bio_html = renderer.render(mistletoe.Document(bio))
        bio_html = sanitize(bio_html, linkgen=True)

        # Run safety filter
        bans = filter_comment_html(bio_html)

        if bans:
            ban = bans[0]
            reason = f"Remove the {ban.domain} link from your bio and try again."
            if ban.reason:
                reason += f" {ban.reason_text}"
                
            #auto ban for digitally malicious content
            if any([x.reason==4 for x in bans]):
                v.ban(days=30, reason="Digitally malicious content is not allowed.")
            return jsonify({"error": reason}), 401

        v.bio = bio
        v.bio_html=bio_html
        g.db.add(v)
        
        #seo profile spam
        if int(time.time())-v.created_utc < 60*60*24 and not v.post_count and not v.comment_count and BeautifulSoup(bio_html).find('a'):
            v.ban(reason="seo spam")
        
        
        return {"html":lambda:render_template("settings_profile.html",
                               v=v,
                               msg="Your bio has been updated."),
                "vue":lambda:(jsonify({"message":"Your bio has been updated."}), 204),
                "api":lambda:jsonify({"message":"Your bio has been updated."})}



###############



    if request.values.get("filters"):

        filters=request.values.get("filters")[0:1000].lstrip().rstrip()

        if filters==v.custom_filter_list:
            return {"html":lambda:render_template("settings_profile.html",
                                   v=v,
                                   error="You didn't change anything"),
                    "vue":lambda:(jsonify({"error":"You didn't change anything"}), 400),
                    "api":lambda:jsonify({"error":"You didn't change anything"})
                    }

        v.custom_filter_list=filters
        g.db.add(v)
        return {"html":lambda:render_template("settings_profile.html",
                               v=v,
                               msg="Your custom filters have been updated."),
                "vue":lambda:(jsonify({"message":"Your custom filters have been updated"}), 204),
                "api":lambda:jsonify({"message":"Your custom filters have been updated"})}



###############



    if request.values.get("title_id"):
        x = int(x)
        if x == 0:
            v.title_id = None
            updated = True
        elif x > 0:
            title = get_title(x)
            if bool(eval(title.qualification_expr)):
                v.title_id = title.id
                updated = True
            else:
                return jsonify({"error": f"You don't meet the requirements for title `{title.text}`."}), 403
        else:
            #abort(400)
            return "", 400



###############



    if request.values.get("defaultsorting"):
        if defaultsorting in ["hot", "new", "old", "activity", "disputed", "top"]:
            v.defaultsorting = defaultsorting
            updated = True
        else:
            return "", 400



###############



    if request.values.get("defaulttime"):
        if defaulttime in ["day", "week", "month", "year", "all"]:
            v.defaulttime = defaulttime
            updated = True
        else:
            return "", 400



###############



    if request.values.get("new_password"):
        if request.values.get("new_password") != request.values.get("cnf_password"):
                return jsonify({"error": "Passwords do not match."})

        if not re.match(valid_password_regex, request.values.get("new_password")):
            #print(f"signup fail - {username } - invalid password")
                return jsonify({"error": "Password must be between 8 and 100 characters."})

        if not v.verifyPass(request.values.get("old_password")):
            return jsonify({"error": "Incorrect passsword."})

        v.passhash = v.hash_password(request.values.get("new_password"))
        updated = True



###############



    if request.values.get("new_email"):

        if not v.verifyPass(request.values.get('password')):
            return jsonify({"error": "Incorrect passsword."})

        new_email = request.values.get("new_email","").lstrip().rstrip()
        #counteract gmail username+2 and extra period tricks - convert submitted email to actual inbox
        if new_email.endswith("@gmail.com"):
            gmail_username=new_email.split('@')[0]
            gmail_username=gmail_username.split("+")[0]
            gmail_username=gmail_username.replace('.','')
            new_email=f"{gmail_username}@gmail.com"

        if new_email == v.email:
            return jsonify({"error": "That email is already yours!"})

        # check to see if email is in use
        existing = g.db.query(User).filter(User.id != v.id,
                                           func.lower(User.email) == new_email.lower()).first()
        if existing:
            return jsonify({"error": "That email address is already in use."})

        url = f"https://{app.config['SERVER_NAME']}/activate"

        now = int(time.time())

        token = generate_hash(f"{new_email}+{v.id}+{now}")
        params = f"?email={quote(new_email)}&id={v.id}&time={now}&token={token}"

        link = url + params

        send_mail(to_address=new_email,
                  subject="Verify your email address.",
                  html=render_template("email/email_change.html",
                                       action_url=link,
                                       v=v)
                  )

        return jsonify({"message": "Check your email and click the verification link to complete the email change."})



###############



    if request.values.get("2fa_token",):
        if not v.verifyPass(request.values.get('password')):
            return jsonify({"error": "Invalid password or token."})
        secret = request.values.get("2fa_secret")
        x = pyotp.TOTP(secret)
        if not x.verify(request.values.get("2fa_token"), valid_window=1):
            return jsonify({"error": "Invalid password or token."})
        v.mfa_secret = secret
        updated =True



###############


    if request.values.get("2fa_remove"):
        if not v.verifyPass(request.values.get('password')):
            return jsonify({"error": "Invalid password or token."})
        token = request.values.get("2fa_remove")
        if not v.validate_2fa(token) and not safe_compare(v.mfa_removal_code, token.lower().replace(' ','')):
            return jsonify({"error": "Invalid password or token."})
        v.mfa_secret = None
        updated =True


###############


    if request.values.get("user_info"):
        return jsonify(v.vue_json), 200


###############


    if request.values.get("dark_mode"):
        if session["dark_mode_enabled"] == 1: session["dark_mode_enabled"] = 0
        else: session["dark_mode_enabled"] = 1
        session.modified = True
        return "", 204


###############


    if request.values.get("log_out_all_others"):
        submitted_password = request.values.get("password", "")

        if not v.verifyPass(submitted_password):
            return render_template("settings_security.html",
                                   v=v, error="Incorrect Password"), 401

        # increment account's nonce
        v.login_nonce += 1

        # update cookie accordingly
        session["login_nonce"] = v.login_nonce

        g.db.add(v)

        return render_template("settings_security.html", v=v,
                               msg="All other devices have been logged out")


###############


    if request.values.get("updateprofile"):
        if v.can_upload_avatar:
            v.set_profile(request.files["profile"])

            # anti csam
            new_thread = threading.Thread(target=check_csam_url,
                                          args=(v.profile_url,
                                                v,
                                                lambda: board.del_profile()
                                                )
                                          )
            new_thread.start()

            return render_template("settings_profile.html",
                                   v=v, msg="Profile picture successfully updated.")

        return render_template("settings_profile.html", v=v,
                               msg="Avatars require 300 reputation.")


###############



    if request.values.get("updatebanner"):
        if v.can_upload_banner:
            v.set_banner(request.files["banner"])

            # anti csam
            new_thread = threading.Thread(target=check_csam_url,
                                          args=(v.banner_url,
                                                v,
                                                lambda: board.del_banner()
                                                )
                                          )
            new_thread.start()

            return render_template("settings_profile.html",
                                   v=v, msg="Banner successfully updated.")

        return render_template("settings_profile.html", v=v,
                               msg="Banners require 500 reputation.")


###############


    if request.values.get("deleteprofile"):
        v.del_profile()
        return render_template("settings_profile.html", v=v,
                               msg="Profile picture successfully removed.")


###############


    if request.values.get("new_feedkey"):
        v.feed_nonce += 1
        g.db.add(v)
        return render_template("settings_profile.html", v=v,
                               msg="Your new custom RSS Feed Token has been generated.")


###############


    if request.values.get("deletebanner"):
        v.del_banner()
        return render_template("settings_profile.html", v=v,
                               msg="Banner successfully removed.")



###############



    if request.values.get("toggle_collapse"):
        session["sidebar_collapsed"] = not session.get("sidebar_collapsed", False)
        return "", 204


###############


    if request.values.get("delete_account"):
        if not v.verifyPass(request.values.get("password", "")) or (
                v.mfa_secret and not v.validate_2fa(request.values.get("twofactor", ""))):
            return render_template("settings_security.html", v=v,
                                   error="Invalid password or token" if v.mfa_secret else "Invalid password")


        remove_user(v)

        v.discord_id=None
        v.is_deleted = True
        v.login_nonce += 1
        v.delete_reason = request.values.get("delete_reason", "")
        v.patreon_id=None
        v.patreon_pledge_cents=0
        v.del_banner()
        v.del_profile()
        g.db.add(v)

        mods = g.db.query(ModRelationship).filter_by(user_id=v.id).all()
        for mod in mods:
            g.db.delete(mod)

        bans = g.db.query(BanRelationship).filter_by(user_id=v.id).all()
        for ban in bans:
            g.db.delete(ban)

        contribs = g.db.query(ContributorRelationship).filter_by(
            user_id=v.id).all()
        for contrib in contribs:
            g.db.delete(contrib)

        blocks = g.db.query(UserBlock).filter_by(target_id=v.id).all()
        for block in blocks:
            g.db.delete(block)

        for b in v.boards_modded:
            if b.mods_count == 0:
                b.is_private = False
                b.restricted_posting = False
                b.all_opt_out = False
                g.db.add(b)

        session.pop("user_id", None)
        session.pop("session_id", None)

        #deal with throwaway spam - auto nuke content if account age below threshold
        if int(time.time()) - v.created_utc < 60*60*12:
            for post in v.submissions:
                post.is_banned=True

                new_ma=ModAction(
                    user_id=1,
                    kind="ban_post",
                    target_submission_id=post.id,
                    note="spam"
                    )

                g.db.add(post)
                g.db.add(new_ma)

            for comment in v.comments:
                comment.is_banned=True
                new_ma=ModAction(
                    user_id=1,
                    kind="ban_comment",
                    target_comment_id=comment.id,
                    note="spam"
                    )
                g.db.add(comment)
                g.db.add(new_ma)

        g.db.commit()

        return redirect('/')


###############


    if request.values.get("block"):
        user = get_user(request.values.get("username"), graceful=True)

        if not user:
            return jsonify({"error": "That user doesn't exist."}), 404

        if user.id == v.id:
            return jsonify({"error": "You can't block yourself."}), 409

        if v.has_block(user):
            return jsonify({"error": f"You have already blocked @{user.username}."}), 409

        if user.id == 1:
            return jsonify({"error": "You can't block @ruqqus."}), 409
        if user.is_deleted:
            return jsonify({"error": "That account has been deactivated"}), 410
        new_block = UserBlock(user_id=v.id,
                              target_id=user.id,
                              created_utc=int(time.time())
                              )
        g.db.add(new_block)

        cache.delete_memoized(v.idlist)
        #cache.delete_memoized(Board.idlist, v=v)
        cache.delete_memoized(frontlist, v=v)

        return jsonify({"message": f"@{user.username} blocked."})



###############



    if request.values.get("unblock"):
        user = get_user(request.values.get("username"))

        x = v.has_block(user)
        if not x:
            abort(409)

        g.db.delete(x)

        cache.delete_memoized(v.idlist)
        #cache.delete_memoized(Board.idlist, v=v)
        cache.delete_memoized(frontlist, v=v)

        return jsonify({"message": f"@{user.username} unblocked."})


###############


    if request.values.get("block_guild"):

        board = get_guild(request.values.get("board"), graceful=True)

        if not board:
            return jsonify({"error": "That guild doesn't exist."}), 404

        if v.has_blocked_guild(board):
            return jsonify({"error": f"You have already blocked +{board.name}."}), 409

        new_block = BoardBlock(user_id=v.id,
                               board_id=board.id,
                               created_utc=int(time.time())
                               )
        g.db.add(new_block)
        g.db.commit()

        cache.delete_memoized(v.idlist)
        #cache.delete_memoized(Board.idlist, v=v)
        cache.delete_memoized(frontlist, v=v)

        return jsonify({"message": f"+{board.name} added to filter"})


###############


    if request.values.get("unblock_guild"):
        board = get_guild(request.values.get("board"), graceful=True)

        x = v.has_blocked_guild(board)
        if not x:
            abort(409)

        g.db.delete(x)
        g.db.commit()

        cache.delete_memoized(v.idlist)
        #cache.delete_memoized(Board.idlist, v=v)
        cache.delete_memoized(frontlist, v=v)

        return jsonify({"message": f"+{board.name} removed from filter"})


###############


    if request.values.get("remove_discord"):
        if v.admin_level>1:
            return render_template("settings_filters.html", v=v, error="Admins can't disconnect Discord.")

        remove_user(v)

        v.discord_id=None
        g.db.add(v)
        g.db.commit()

        return redirect("/settings/profile")


###############



    if request.values.get("name_change"):
        if v.admin_level:
            return render_template("settings_profile.html",
                               v=v,
                               error="Admins can't change their name.")


        new_name=request.values.get("name").lstrip().rstrip()

        #make sure name is different
        if new_name==v.username:
            return render_template("settings_profile.html",
                               v=v,
                               error="You didn't change anything")

        #can't change name on verified ID accounts
        if v.real_id:
            return render_template("settings_profile.html",
                               v=v,
                               error="Your ID is verified so you can't change your username.")

        #7 day cooldown
        if v.name_changed_utc > int(time.time()) - 60*60*24*7:
            return render_template("settings_profile.html",
                               v=v,
                               error=f"You changed your name {(int(time.time()) - v.name_changed_utc)//(60*60*24)} days ago. You need to wait 7 days between name changes.")

        #costs 3 coins
        if v.coin_balance < 20:
            return render_template("settings_profile.html",
                               v=v,
                               error=f"Username changes cost 20 Coins. You only have a balance of {v.coin_balance} Coins")

        #verify acceptability
        if not re.match(valid_username_regex, new_name):
            return render_template("settings_profile.html",
                               v=v,
                               error=f"That isn't a valid username.")

        #verify availability
        name=new_name.replace('_','\_')

        x= g.db.query(User).options(
            lazyload('*')
            ).filter(
            or_(
                User.username.ilike(name),
                User.original_username.ilike(name)
                )
            ).first()

        if x and x.id != v.id:
            return render_template("settings_profile.html",
                               v=v,
                               error=f"Username `{new_name}` is already in use.")

        #all reqs passed

        #check user avatar/banner for rename if needed
        if v.has_profile and v.profile_url.startswith("https://i.ruqqus.com/users/"):
            upload_from_url(f"uid/{v.base36id}/profile-{v.profile_nonce}.png", f"{v.profile_url}")
            v.profile_set_utc=int(time.time())
            g.db.add(v)
            g.db.commit()

        if v.has_banner and v.banner_url.startswith("https://i.ruqqus.com/users/"):
            upload_from_url(f"uid/{v.base36id}/banner-{v.banner_nonce}.png", f"{v.banner_url}")
            v.banner_set_utc=int(time.time())
            g.db.add(v)
            g.db.commit()


        #do name change and deduct coins

        v=g.db.query(User).with_for_update().options(lazyload('*')).filter_by(id=v.id).first()

        v.username=new_name
        v.coin_balance-=20
        v.name_changed_utc=int(time.time())

        set_nick(v, new_name)

        g.db.add(v)
        g.db.commit()

        return render_template("settings_profile.html",
                           v=v,
                           msg=f"Username changed successfully. 20 Coins have been deducted from your balance.")



    if request.values.get("badges"):

        v.refresh_selfset_badges()

        return jsonify({"message":"Badges Refreshed"})


    if updated:
        g.db.add(v)
        return jsonify({"message": "Your settings have been updated."})
    else:
        return jsonify({"error": "You didn't change anything."}), 400


###############



@app.route("/api/vue/account/info", methods=["GET"])
@auth_required
def settings_user_info(v):
    return jsonify(v.vue_json), 200

@app.route("/settings/blocks", methods=["GET"])
@auth_required
def settings_blockedpage(v):

    #users=[x.target for x in v.blocked]

    return render_template("settings_blocks.html",
                           v=v)


@app.route("/settings/filters", methods=["GET"])
@auth_required
def settings_blockedguilds(v):

    #users=[x.target for x in v.blocked]

    return render_template("settings_guildfilter.html",
                           v=v)

@app.route("/settings/apps", methods=["GET"])
@auth_required
def settings_apps(v):

    return render_template("settings_apps.html", v=v)


@app.route("/settings/content", methods=["GET"])
@auth_required
def settings_content_get(v):

    return render_template("settings_filters.html", v=v)

@app.route("/settings/purchase_history", methods=["GET"])
@auth_required
def settings_purchase_history(v):

    return render_template("settings_txnlist.html", v=v)
