import { Globe, Package, Users, Building2, Clock, Award, Truck, Settings, HeadphonesIcon, Shield } from 'lucide-react'
import { companyTimeline, whyChooseUs, certifications } from '../data/company'

export default function AboutPage() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Crystal Elevator</h1>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto">
              Leading manufacturer and exporter of elevator parts since 1992. 33 years of excellence in opto-electro-mechanical products.
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Profile</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-900">Crystal Elevator Co., Ltd</strong>, founded in 1992,
                  is a 33-year professional manufacturer specializing in designing and producing Opto-Electro-Mechanical products.
                </p>
                <p>
                  Our company has evolved from a local manufacturer to a global leader, exporting to 82 countries
                  and serving more than 3,000 overseas customers.
                </p>
                <p>
                  Since starting international trade in 2012, we have exported 7,443 containers of elevator parts,
                  making us one of the TOP 3 elevator parts exporters in China.
                </p>
                <p>
                  We offer a comprehensive range of elevator components including Buttons, Light Curtains, Photoelectric
                  Switches, Displays, COP & LOP, Traction Machines, and Door Mechanisms, along with many other parts.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
              <div className="text-center mb-8">
                <img src="/logo.png" alt="Crystal Elevator Logo" className="w-32 h-32 object-contain mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Crystal Elevator</h3>
                <p className="text-gray-500">Since 1992</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '1992', label: 'Founded' },
                  { value: '33+', label: 'Years' },
                  { value: 'TOP 3', label: 'Exporter' },
                  { value: 'ISO', label: 'Certified' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">33 years of growth and excellence</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {companyTimeline.map((item, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: whyChooseUs[0]?.title || '33 Years Experience', desc: whyChooseUs[0]?.description || '', icon: Clock, bg: 'bg-orange-100', text: 'text-orange-600' },
              { title: whyChooseUs[1]?.title || 'Global Reach', desc: whyChooseUs[1]?.description || '', icon: Globe, bg: 'bg-blue-100', text: 'text-blue-600' },
              { title: whyChooseUs[2]?.title || 'Quality Assurance', desc: whyChooseUs[2]?.description || '', icon: Award, bg: 'bg-green-100', text: 'text-green-600' },
              { title: whyChooseUs[3]?.title || 'Fast Delivery', desc: whyChooseUs[3]?.description || '', icon: Truck, bg: 'bg-purple-100', text: 'text-purple-600' },
              { title: whyChooseUs[4]?.title || 'Custom Solutions', desc: whyChooseUs[4]?.description || '', icon: Settings, bg: 'bg-red-100', text: 'text-red-600' },
              { title: whyChooseUs[5]?.title || '24/7 Support', desc: whyChooseUs[5]?.description || '', icon: HeadphonesIcon, bg: 'bg-cyan-100', text: 'text-cyan-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <item.icon className={item.text} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Certifications</h2>
            <p className="text-gray-400">All products meet international quality standards</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-gray-800 rounded-xl px-6 py-4 flex items-center gap-3">
                <Shield className="text-blue-400" size={24} />
                <span className="text-white font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
