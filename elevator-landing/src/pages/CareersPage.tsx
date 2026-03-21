import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, GraduationCap, Heart as HeartIcon, Clock3, MapPinIcon, CheckCircle, ArrowRight, Users as UsersIcon } from 'lucide-react'
import { jobOpenings } from '../data/company'

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Team</h1>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto">
              Be part of a leading elevator parts company with 33 years of history. We're always looking for talented individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Global Company', description: 'Work with a TOP 3 exporter serving 82 countries' },
              { icon: GraduationCap, title: 'Growth Opportunities', description: 'Clear career paths and training programs' },
              { icon: HeartIcon, title: 'Great Benefits', description: 'Competitive salary, health insurance, and more' },
              { icon: Clock3, title: 'Work-Life Balance', description: 'Flexible hours and paid time off' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-gray-600">Find your perfect role at Crystal Elevator</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className={`bg-gray-50 rounded-2xl p-6 cursor-pointer transition ${
                  selectedJob === job.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPinIcon size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock3 size={14} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                {selectedJob === job.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle className="text-green-500" size={16} />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/contact?job=${job.id}`}
                      className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Apply Now
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Position?</h2>
          <p className="text-blue-100 mb-8">
            Send us your resume anyway! We're always interested in meeting talented people.
          </p>
          <Link
            to="/contact?subject=Career%20Inquiry"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            <UsersIcon size={20} />
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
