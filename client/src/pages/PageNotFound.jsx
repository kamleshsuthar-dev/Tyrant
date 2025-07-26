"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, ShoppingBag, Home, Package, Sparkles } from "lucide-react"
import {Link} from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function PageNotFound() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const popularCategories = [
    { name: "Electronics", href: "/electronics", icon: "📱" },
    { name: "Fashion", href: "/fashion", icon: "👕" },
    { name: "Home & Garden", href: "/home", icon: "🏠" },
    { name: "Sports", href: "/sports", icon: "⚽" },
  ]

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main 404 Content */}
        <div
          className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-slate-200 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-bounce">
                <ShoppingBag className="w-16 h-16 md:w-24 md:h-24 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Oops! Page Not Found</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for seems to have wandered off. Don't worry, let's get you back to shopping for
              amazing products!
            </p>
          </div>

          {/* Search Bar */}

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-700 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-slate-50 transition-all hover:scale-105 bg-transparent"
            >
              <Link to="/">
                <Package className="w-5 h-5 mr-2" />
                Browse Products
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-slate-50 transition-all hover:scale-105 bg-transparent"
            >
              <Link to="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        {/* Popular Categories */}
        <div
          className={`mb-12 transition-all duration-1000 delay-900 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-semibold text-slate-800 text-center mb-6">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularCategories.map((category, index) => (
              <Card
                key={category.name}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to="/">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2 group-hover:animate-pulse">{category.icon}</div>
                  <h4 className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h4>
                </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

       
    

        {/* Footer Message */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-slate-500">Need help? Our customer support team is here to assist you 24/7</p>
        </div>
      </div>
    </div>
  )
}
