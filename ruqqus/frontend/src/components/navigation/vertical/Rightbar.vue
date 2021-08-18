<template>
					<!-- Right Bar -->
				<div class="hidden lg:block flex-shrink-0 w-80">
					<div v-show="loading" class="flex flex-col w-full p-4 animate-pulse">
						<div class="space-y-4">
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-16 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-full h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-24 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-2/4 h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-16 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-24 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="!loading" class="space-y-4">
						<SidebarSection title="Improve your acount">
							<template v-slot:body>
								<div class="p-4 bg-white dark:bg-gray-800 rounded-sm">
									<ul class="mb-0 space-y-4">
										<li>
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<i class="far fa-check text-green-500 fa-fw"></i>
												<span class="text-gray-500 line-through pl-2">
													Follow 10 more people
												</span>
											</a>
										</li>
										<li>
											<router-link to="/submit" class="group flex items-center">
												<i class="far fa-check text-gray-200 dark:text-gray-500 fa-fw"></i>
												<span class="text-purple-500 dark:text-gray-200 pl-2">
													Create your first post
												</span>
											</router-link>
										</li>
										<li>
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<i class="far fa-check text-gray-200 dark:text-gray-500 fa-fw"></i>
												<span class="text-purple-500 dark:text-gray-200 pl-2">
													Write a profile biography
												</span>
											</a>
										</li>
										<li>
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<i class="far fa-check text-gray-200 dark:text-gray-500 fa-fw"></i>
												<span class="text-purple-500 dark:text-gray-200 pl-2">
													Upload a custom avatar
												</span>
											</a>
										</li>
									</ul>
								</div>
							</template>
						</SidebarSection>
						<SidebarSection>
							<template v-slot:body>
								<div class="p-4 bg-white dark:bg-gray-800 rounded-sm">
									<div class="flex items-center mb-2">
										<img src="https://i.ruqqus.com/board/ruqqus/profile-3.png" class="w-8 h-8 rounded-sm bg-gray-100 dark:bg-gray-800 object-cover">
										<div class="pl-3 font-bold">
											Home
										</div>
									</div>
									<p class="text-sm text-gray-600 dark:text-gray-200">
										Your personal Ruqqus homepage. Check here for content from your communities and people you follow.
									</p>
									<button class="button purple500 w-full" to="/submit">
										Create post
									</button>
								</div>
							</template>
						</SidebarSection>
						<SidebarSection title="Support Ruqqus">
							<template v-slot:body>
								<ul class="mb-0 p-4 space-y-3 bg-white dark:bg-gray-800 rounded-sm">
									<li>
										<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center justify-between">
											<div class="pr-3">
												<div class="text-sm text-gray-900 dark:text-gray-200 font-bold">
													Contribute Code
													<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
												</div>
												<p class="text-xs text-gray-500 dark:text-gray-400">
													Ruqqus is open-source!
												</p>
											</div>
											<div class="flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-sm bg-gray-100">
												<i class="fab fa-github text-black"></i>
											</div>
										</a>
									</li>
									<li>
										<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center justify-between">
											<div class="pr-3">
												<div class="text-sm text-gray-900 dark:text-gray-200 font-bold">
													Ruqqus Merch
													<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
												</div>
												<p class="text-xs text-gray-500 dark:text-gray-400">
													Keeps the servers running :)
												</p>
											</div>
											<div class="flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-sm bg-blue-100">
												<i class="fas fa-tshirt text-blue-500"></i>
											</div>
										</a>
									</li>
									<li>
										<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center justify-between">
											<div class="pr-3">
												<div class="text-sm text-gray-900 dark:text-gray-200 font-bold">
													Report a Bug
													<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
												</div>
												<p class="text-xs text-gray-500 dark:text-gray-400">
													Help us squash 'em
												</p>
											</div>
											<div class="flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-sm bg-red-100">
												<i class="fas fa-bug text-red-500"></i>
											</div>
										</a>
									</li>
								</ul>
							</template>
						</SidebarSection>
					</div>
				</div>
				<!-- End Right bar -->
</template>