import { Globe, Award, Users, Factory } from 'lucide-react'
import { companyInfo } from '../data/company'

export default function AboutPage() {
  const stats = [
    { label: 'Years Experience', value: companyInfo.experience + '+' },
    { label: 'Countries Served', value: '82+' },
    { label: 'Happy Customers', value: '3,000+' },
    { label: 'Products', value: '500+' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-gray-300">Premium elevator parts supplier since {companyInfo.founded}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Founded in {companyInfo.founded}, {companyInfo.name} has been a leading manufacturer 
              and exporter of elevator parts for over {companyInfo.experience} years.
            </p>
            <p>
              We specialize in opto-electro-mechanical elevator components, serving customers 
              in {companyInfo.countriesServed}+ countries worldwide.
            </p>
            <p>
              Our commitment to quality and customer satisfaction has made us one of 
              the top elevator parts suppliers in China.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <Globe size={32} className="text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
            <p className="text-gray-600">Serving customers in 82+ countries worldwide</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <Award size={32} className="text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Quality Certified</h3>
            <p className="text-gray-600">ISO certified manufacturing processes</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <Users size={32} className="text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-gray-600">24/7 technical assistance</p>
          </div>
        </div>
      </div>
    </div>
  )
}
