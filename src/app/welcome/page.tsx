import Link from "next/link";

export default function House() {
	return (
		<main className="min-h-screen bg-gray-50 text-gray-900 antialiased">
			<div className="max-w-3xl mx-auto px-4 py-8">
				{/* HERO / WELCOME SECTION */}
				<section className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 md:p-8">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 mt-1">
							<svg className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden>
								<rect width="24" height="24" rx="4" fill="#eef2ff" />
								<path d="M6 10h12M6 14h8" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
						<div>
							<h1 className="text-2xl font-semibold text-gray-900">Hometown Connect — Stay connected to your district</h1>
							<p className="mt-1 text-sm text-gray-600">Access services, report issues, and receive updates from your hometown — from anywhere.</p>
							<p className="mt-3 text-sm text-gray-700">This is a demo civic platform for citizens, officials, and administrators to communicate transparently and efficiently.</p>

							<div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
								<Link href="/home" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Enter User Panel</Link>
								<Link href="/admin" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-white text-indigo-700 border border-indigo-200 text-sm font-medium hover:bg-indigo-50">Enter Admin Panel</Link>
								<Link href="/super" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-white text-gray-700 border border-gray-200 text-sm font-medium hover:bg-gray-50">Enter Super Admin Panel</Link>
							</div>
						</div>
					</div>
				</section>

				{/* ABOUT THE PLATFORM */}
				<section className="mt-6 grid gap-4">
					<div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
						<h2 className="text-lg font-semibold text-gray-900">About Hometown Connect</h2>
						<p className="mt-2 text-sm text-gray-700">Hometown Connect helps citizens stay informed and involved with their hometown district. It's designed for people living outside their hometowns, seasonal residents, and local administrators who need a simple, trustworthy way to share and receive information.</p>

						<ul className="mt-3 space-y-2 text-sm text-gray-700">
							<li className="flex gap-2 items-start">
								<span className="text-indigo-600 mt-0.5">•</span>
								<span>Receive real-time service updates and announcements for utilities, welfare programs, and local news.</span>
							</li>
							<li className="flex gap-2 items-start">
								<span className="text-indigo-600 mt-0.5">•</span>
								<span>Report problems and communicate with the right department without needing a traditional login.</span>
							</li>
							<li className="flex gap-2 items-start">
								<span className="text-indigo-600 mt-0.5">•</span>
								<span>Track complaint progress using a ticket ID and get timely updates from administrators.</span>
							</li>
						</ul>
					</div>

					{/* HOW TO USE — Panels */}
					<div className="grid grid-cols-1 gap-3">
						<h3 className="sr-only">Panels overview</h3>
						<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
							<h3 className="text-base font-semibold text-gray-900">How to use the system</h3>
							<p className="mt-2 text-sm text-gray-600">The platform uses three panels. Choose the role that fits what you want to do — you can switch between them freely.</p>

							<div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
								{/* User Panel */}
								<article className="p-3 border border-gray-100 rounded-md bg-gray-50">
									<div className="flex items-start gap-3">
										<svg className="h-7 w-7 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
											<circle cx="12" cy="8" r="3" fill="#ecfdf5" />
											<path d="M4 20c1.5-4 8-4 8-4s6.5 0 8 4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<div>
											<h4 className="text-sm font-medium text-gray-900">User Panel</h4>
											<p className="mt-1 text-xs text-gray-700">For citizens to access services and updates.</p>
											<ul className="mt-2 text-xs text-gray-700 space-y-1">
												<li>Chat with AI assistant</li>
												<li>Check utility status</li>
												<li>View schemes & file complaints</li>
												<li>Track complaints with ticket ID</li>
												<li>Read local news</li>
											</ul>
										</div>
									</div>
								</article>

								{/* Admin Panel */}
								<article className="p-3 border border-gray-100 rounded-md bg-gray-50">
									<div className="flex items-start gap-3">
										<svg className="h-7 w-7 text-yellow-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
											<rect x="3" y="3" width="18" height="18" rx="3" fill="#fffbeb" />
											<path d="M8 12h8M8 16h8" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<div>
											<h4 className="text-sm font-medium text-gray-900">Admin Panel</h4>
											<p className="mt-1 text-xs text-gray-700">For department staff to manage assigned tasks.</p>
											<ul className="mt-2 text-xs text-gray-700 space-y-1">
												<li>Update utility schedules</li>
												<li>Manage assigned complaints</li>
												<li>Update status and add notes</li>
											</ul>
										</div>
									</div>
								</article>

								{/* Super Admin Panel */}
								<article className="p-3 border border-gray-100 rounded-md bg-gray-50">
									<div className="flex items-start gap-3">
										<svg className="h-7 w-7 text-red-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
											<rect x="3" y="3" width="18" height="18" rx="3" fill="#fff1f2" />
											<path d="M7 12h10M7 8h10" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<div>
											<h4 className="text-sm font-medium text-gray-900">Super Admin Panel</h4>
											<p className="mt-1 text-xs text-gray-700">For system managers and moderators.</p>
											<ul className="mt-2 text-xs text-gray-700 space-y-1">
												<li>View all complaints</li>
												<li>Manage master data</li>
												<li>Moderate announcements and content</li>
											</ul>
										</div>
									</div>
								</article>
							</div>
						</div>
					</div>
				</section>

				{/* AI ASSISTANT GUIDE */}
				<section className="mt-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
					<h3 className="text-base font-semibold text-gray-900">AI Assistant — How it helps</h3>
					<p className="mt-2 text-sm text-gray-700">Use the chatbot to get quick answers, report issues, and follow up on service requests without needing technical knowledge.</p>

					<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
						<div className="p-3 border border-gray-100 rounded-md bg-gray-50">
							<h4 className="font-medium">What you can do</h4>
							<ul className="mt-2 space-y-1">
								<li>Ask about local services and schedules</li>
								<li>Report problems with photos or descriptions</li>
								<li>Receive a ticket ID after filing a complaint</li>
								<li>Request status updates using your ticket ID</li>
							</ul>
						</div>

						<div className="p-3 border border-gray-100 rounded-md bg-gray-50">
							<h4 className="font-medium">Best practices</h4>
							<ul className="mt-2 space-y-1">
								<li>Provide clear location and issue details</li>
								<li>Keep your ticket ID safe for tracking</li>
								<li>Use simple language — the assistant is citizen-friendly</li>
							</ul>
						</div>
					</div>
				</section>

				{/* QUICK START STEPS */}
				<section className="mt-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
					<h3 className="text-base font-semibold text-gray-900">Quick start</h3>
					<ol className="mt-3 space-y-2 text-sm text-gray-700 list-decimal list-inside">
						<li>Choose a panel that matches your role or task.</li>
						<li>Explore available services and local announcements.</li>
						<li>Use the AI assistant for help or to report issues.</li>
						<li>Submit a complaint if needed and note the ticket ID.</li>
						<li>Track progress with the ticket ID or check updates in the panel.</li>
					</ol>
				</section>

				{/* FOOTER / DISCLAIMER */}
				<footer className="mt-6 text-center text-xs text-gray-500">
					<p>Demo system — no traditional login. Switch panels to explore different roles and capabilities.</p>
					<p className="mt-2">Designed for clear, accessible civic service communication for urban and rural communities.</p>
				</footer>
			</div>
		</main>
	);
}
