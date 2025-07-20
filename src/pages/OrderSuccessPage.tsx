import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const OrderSuccessPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const orderData = location.state || {
    orderNumber: 'ETY-123456789',
    total: 0,
    email: 'customer@example.com'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mb-6">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-900">{orderData.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total:</span>
              <span className="font-medium text-gray-900">${orderData.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-900">{orderData.email}</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p>A confirmation email has been sent to {orderData.email}</p>
          <p className="mt-2">Your order will be processed within 1-2 business days.</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/shop')}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">What's Next?</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• You'll receive a shipping confirmation email</p>
            <p>• Track your order in your account</p>
            <p>• Contact support if you have questions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage