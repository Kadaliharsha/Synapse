import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import TherapistDisplayCard from "../components/therapist/TherapistDisplayCard";

const TherapistDirectory = () => {
    const [therapists, setTherapists] = useState([]);
    const [filteredTherapists, setFilteredTherapists] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [filters, setFilters] = useState({
        specialization: "",
        gender: "",
        maxPrice: "",
        name: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchTherapists();
    }, []);

    const fetchTherapists = async () => {
        try {
            const response = await API.get("/therapist/all");
            setTherapists(response.data);
            setFilteredTherapists(response.data);
        } catch (error) {
            console.error("Error fetching therapists", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [filters, therapists]);

    const applyFilters = () => {
        let result = therapists;

        if (filters.name) {
            result = result.filter(t => t.name.toLowerCase().includes(filters.name.toLowerCase()));
        }
        if (filters.specialization) {
            result = result.filter(t => t.specialization.toLowerCase().includes(filters.specialization.toLowerCase()));
        }
        if (filters.gender) {
            result = result.filter(t => t.gender && t.gender.toLowerCase() === filters.gender.toLowerCase());
        }
        if (filters.maxPrice) {
            result = result.filter(t => t.price && t.price <= parseFloat(filters.maxPrice));
        }

        setFilteredTherapists(result);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Navigate to profile
    const handleViewProfile = (therapist) => {
        // If we have ID, go to ID route. If not (legacy/dummy), fallback or alert.
        if (therapist.id) {
            navigate(`/therapist/${therapist.id}`);
        } else {
            // Fallback for dummy data from Meet.jsx if we mixed them, 
            // but here we fetch from backend so they should have IDs.
            console.warn("Therapist has no ID", therapist);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar /> {/* Assuming simplistic Navbar usage */}

            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Therapist</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-semibold mb-4">Filters</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={filters.name}
                                        onChange={handleFilterChange}
                                        placeholder="Dr. Name"
                                        className="input-field py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={filters.specialization}
                                        onChange={handleFilterChange}
                                        placeholder="e.g. Anxiety"
                                        className="input-field py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={filters.gender}
                                        onChange={handleFilterChange}
                                        className="input-field py-2"
                                    >
                                        <option value="">Any</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="non-binary">Non-binary</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        placeholder="Max Price"
                                        className="input-field py-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Directory Grid */}
                    <div className="flex-grow">
                        {loading ? (
                            <div className="flex justify-center p-12">
                                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTherapists.map(therapist => (
                                    // We modify TherapistDisplayCard usage slightly or hijack the onBookNow to be View Profile
                                    <div key={therapist.id || therapist.email} onClick={() => handleViewProfile(therapist)} className="cursor-pointer">
                                        <TherapistDisplayCard
                                            {...therapist}
                                            onBookNow={() => handleViewProfile(therapist)} // Redirect to profile
                                        />
                                    </div>
                                ))}

                                {filteredTherapists.length === 0 && (
                                    <div className="col-span-full text-center py-12 text-gray-500">
                                        No therapists found matching your filters.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TherapistDirectory;
