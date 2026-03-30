import { useState } from 'react'
import { ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react'

const faqs = [
  { q: 'How do I place an order?', a: 'Browse products, add to cart, and proceed to checkout. Fill in your shipping details and confirm the order.' },
  { q: 'What is the minimum order quantity?', a: 'MOQ varies by product. Each product page shows the minimum order quantity in the product details.' },
  { q: 'How long does shipping take?', a: 'International shipping typically takes 7-15 days depending on the destination country.' },
  { q: 'Do you offer warranty?', a: 'Yes, all products come with 3-year quality warranty. Contact support for warranty claims.' },
  { q: 'Can I get a sample?', a: 'Yes, samples are available. Contact us to request product samples.' },
]

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-gray-300">Find answers to common questions</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                {openIndex === i ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Still need help?</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:support@crystalelevator.com" className="flex items-center gap-2 text-blue-600">
              <Mail size={18} />
              support@crystalelevator.com
            </a>
            <a href="tel:+862188888888" className="flex items-center gap-2 text-blue-600">
              <Phone size={18} />
              +86 21 8888 8888
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
