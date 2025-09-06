import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ events = [], canLogin = false, canRegister = false }) {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);
    const toggle = () => setOpen((v) => !v);

    return (
        <>
            <Head title="Welcome" />

            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur border-b border-blue-800/40 z-40 flex items-center px-4">
                <button
                    onClick={toggle}
                    aria-label="Open navigation"
                    aria-expanded={open}
                    className="mr-3 inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                >
                    <span className="sr-only">Open menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <Link href={route('home')} className="font-semibold text-white hover:text-blue-400">Event Portal</Link>
            </div>

            {/* Drawer & overlay */}
            {/* Overlay */}
            {open && (
                <button
                    onClick={close}
                    aria-label="Close navigation"
                    className="fixed inset-0 bg-black/60 z-40"
                />
            )}

            {/* Drawer panel */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-neutral-900 shadow-xl z-50 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-14 flex items-center justify-between px-4 border-b border-blue-800/40 text-white">
                    
                    <button onClick={close} className="inline-flex w-9 h-9 items-center justify-center rounded-md hover:bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="p-3 space-y-1">
                    <Link href={route('home')} onClick={close} className="block px-3 py-2 rounded-md text-white hover:bg-blue-600/20">Home</Link>
                    <Link href="/bracket" onClick={close} className="block px-3 py-2 rounded-md text-white hover:bg-blue-600/20">Bracket</Link>
                    {canLogin && (
                        <Link href={route('login')} onClick={close} className="block px-3 py-2 rounded-md text-white hover:bg-blue-600/20">Login</Link>
                    )}
                    {canRegister && (
                        <Link href={route('register')} onClick={close} className="block px-3 py-2 rounded-md text-white hover:bg-blue-600/20">Register</Link>
                    )}
                </nav>
            </aside>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-900 text-white pt-20 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Discover Competitive Events</h1>
                        <p className="text-white/70">Explore tournaments and activities curated by coordinators. Register your team and compete.</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-blue-700/60 to-transparent" />
                    </div>
                    {events.length === 0 ? (
                        <p className="text-white/70">No events available at the moment.</p>
                    ) : (
                        <div className="grid gap-4 md:gap-6">
                            {events.map(event => (
                                <Link
                                    key={event.id}
                                    href={route('events.show', event.id)}
                                    className="block group rounded-xl border border-blue-900/40 bg-neutral-900/60 hover:bg-neutral-900 transition-colors shadow-lg shadow-blue-900/10"
                                >
                                    <div className="p-4 md:p-5">
                                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{event.title}</h3>
                                        <p className="mt-1 text-white/70">{event.description}</p>
                                        <p className="mt-2 text-sm text-white/50">
                                            By {event.coordinator_name} | {event.event_date}
                                        </p>

                                        {/* Display all images */}
                                        {event.images && event.images.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {event.images.map(img => (
                                                    <img
                                                        key={img.id}
                                                        src={`/storage/${img.image_path}`}
                                                        alt={event.title}
                                                        className="w-24 h-24 object-cover rounded-lg ring-1 ring-blue-800/40"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {event.is_done && (
                                            <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-400">
                                                <span>✓</span> Done
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
