import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function App() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE}/events`);
            setEvents(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function onSubmit(data) {
        try {
            await axios.post(`${API_BASE}/events`, {
                title: data.title,
                description: data.description,
                location: data.location,
                startTime: data.startTime,
                endTime: data.endTime,
            });
            reset();
            fetchEvents();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-semibold">Event Booking</h1>
                    <p className="mt-2 text-slate-400">Create and view events quickly with React, Tailwind, and react-hook-form.</p>
                </header>

                <main className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
                    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
                        <h2 className="mb-6 text-2xl font-semibold">Create event</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">Title</label>
                                <input
                                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                                    {...register('title', { required: true })}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">Description</label>
                                <textarea
                                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                                    rows="4"
                                    {...register('description')}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">Location</label>
                                <input
                                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                                    {...register('location')}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">Start time</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                                        {...register('startTime', { required: true })}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">End time</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                                        {...register('endTime', { required: true })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                                Create event
                            </button>
                        </form>
                    </section>

                    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Events</h2>
                            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{events.length}</span>
                        </div>

                        {loading ? (
                            <p className="text-slate-400">Loading events…</p>
                        ) : events.length === 0 ? (
                            <p className="text-slate-400">No events created yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <article key={event.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                                        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                                        <p className="mt-2 text-slate-400">{event.description}</p>
                                        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                                            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">{event.location}</span>
                                            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">{new Date(event.startTime).toLocaleString()}</span>
                                            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">{new Date(event.endTime).toLocaleString()}</span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default App;
