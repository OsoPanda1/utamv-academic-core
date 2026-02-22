import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Zap, Shield, Users, Award, BarChart3, TrendingUp, DollarSign, Target } from "lucide-react";
import { 
  MARKET_COMPETITORS, 
  MARKET_INSIGHTS, 
  PROGRAM_PRICING, 
  UTAMV_PRICING_TIERS, 
  PRICING_STRATEGY,
  REVENUE_PROJECTIONS
} from "@/data/pricingAnalysis";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'programs' | 'analysis'>('plans');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  useEffect(() => {
    // Add analytics for pricing page view
    console.log('Pricing page viewed');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Precios Competitivos para la Excelencia
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Ofreciendo calidad premium a un precio 15% menor que cualquier competencia en América Latina
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Badge className="bg-white/20 text-white border-none px-4 py-2 text-sm">
              <DollarSign className="w-4 h-4 mr-2" />
              Precios accesibles
            </Badge>
            <Badge className="bg-white/20 text-white border-none px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              Calidad premium
            </Badge>
            <Badge className="bg-white/20 text-white border-none px-4 py-2 text-sm">
              <Target className="w-4 h-4 mr-2" />
              Contenido adaptado a LATAM
            </Badge>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={activeTab === 'plans' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('plans')}
              className="flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              Planes
            </Button>
            <Button
              variant={activeTab === 'programs' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('programs')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Programas
            </Button>
            <Button
              variant={activeTab === 'analysis' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('analysis')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Análisis de Mercado
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Pricing Plans */}
          {activeTab === 'plans' && (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {UTAMV_PRICING_TIERS.map((tier) => (
                <Card 
                  key={tier.id} 
                  className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    tier.isPopular ? 'border-2 border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <CardHeader className="pb-4">
                    {tier.isPopular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                        Más Popular
                      </Badge>
                    )}
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        ${tier.pricePerMonth}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        al mes (anual)
                      </div>
                      {tier.monthlyPrice > tier.pricePerMonth && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-through mt-1">
                          Original: ${tier.monthlyPrice}/mes
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {tier.isPopular ? 'Empieza Ahora' : 'Suscribirme'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Programs Pricing */}
          {activeTab === 'programs' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {PROGRAM_PRICING.map((program) => (
                <Card 
                  key={program.id} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg border-gray-200 dark:border-gray-700"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">{program.programName}</CardTitle>
                    <CardDescription className="text-xs">{program.description}</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          ${program.price}
                        </span>
                        {program.marketPrice > program.price && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${program.marketPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {program.durationMonths} meses ({program.totalHours} horas)
                      </div>
                      {program.marketPrice > program.price && (
                        <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Ahorra {program.discountPercentage}%
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Horas por semana</span>
                        <span className="font-medium">{program.hoursPerWeek}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Certificado</span>
                        <span className="font-medium">{program.certificate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Pago</span>
                        <span className="font-medium">
                          {program.paymentOptions.length > 1 ? 'Múltiples opciones' : program.paymentOptions[0]}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Market Analysis */}
          {activeTab === 'analysis' && (
            <div className="space-y-8">
              {/* Market Overview */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Visión del Mercado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${MARKET_INSIGHTS.averageMarketPrice}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Precio promedio regional
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${MARKET_INSIGHTS.ourAveragePrice}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Nuestro precio promedio
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {MARKET_INSIGHTS.discountPercentage}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Ventaja competitiva
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {MARKET_INSIGHTS.projectedGrowth2024}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Crecimiento proyectado 2024
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-blue-900 dark:text-blue-100">
                      Nuestra Estrategia de Precios
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-medium">Enfoque:</p>
                        <p className="text-gray-600 dark:text-gray-300">{PRICING_STRATEGY.approach}</p>
                      </div>
                      <div>
                        <p className="font-medium">Objetivo:</p>
                        <p className="text-gray-600 dark:text-gray-300">{PRICING_STRATEGY.objective}</p>
                      </div>
                      <div>
                        <p className="font-medium">Propósito:</p>
                        <p className="text-gray-600 dark:text-gray-300">{PRICING_STRATEGY.valueProposition}</p>
                      </div>
                      <div>
                        <p className="font-medium">Posicionamiento:</p>
                        <p className="text-gray-600 dark:text-gray-300">{PRICING_STRATEGY.positioning}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competitive Analysis */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Análisis Competitivo
                  </CardTitle>
                  <CardDescription>
                    Cómo nos comparamos con la competencia principal en LATAM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-semibold">Plataforma</th>
                          <th className="text-right py-3 px-4 font-semibold">Precio Promedio</th>
                          <th className="text-center py-3 px-4 font-semibold">Posición</th>
                          <th className="text-center py-3 px-4 font-semibold">Cursos</th>
                          <th className="text-left py-3 px-4 font-semibold">Ventaja</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MARKET_COMPETITORS.map((competitor) => (
                          <tr key={competitor.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4 font-medium">{competitor.name}</td>
                            <td className="text-right py-3 px-4">${competitor.averageCoursePrice}</td>
                            <td className="text-center py-3 px-4">
                              <Badge variant="outline" className={
                                competitor.marketPosition === 'Premium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                competitor.marketPosition === 'Mid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              }>
                                {competitor.marketPosition}
                              </Badge>
                            </td>
                            <td className="text-center py-3 px-4">{competitor.coursesCount.toLocaleString()}</td>
                            <td className="py-3 px-4">{competitor.strengths[0]}</td>
                          </tr>
                        ))}
                        <tr className="bg-blue-50 dark:bg-blue-900/30 font-semibold">
                          <td className="py-3 px-4">UTAMV</td>
                          <td className="text-right py-3 px-4 text-blue-600 dark:text-blue-400">
                            ${MARKET_INSIGHTS.ourAveragePrice}
                          </td>
                          <td className="text-center py-3 px-4">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Premium Accesible
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-4">{PROGRAM_PRICING.length}</td>
                          <td className="py-3 px-4 text-blue-600 dark:text-blue-400">
                            Precio 15% menor
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Projections */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Proyecciones de Ingresos
                  </CardTitle>
                  <CardDescription>
                    Progreso financiero proyectado para los primeros 24 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-semibold">Mes</th>
                          <th className="text-right py-3 px-4 font-semibold">Usuarios Activos</th>
                          <th className="text-right py-3 px-4 font-semibold">Nuevos Usuarios</th>
                          <th className="text-right py-3 px-4 font-semibold">Ingresos ($)</th>
                          <th className="text-right py-3 px-4 font-semibold">Ganancia ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {REVENUE_PROJECTIONS.map((projection) => (
                          <tr key={projection.month} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4 font-medium">{projection.month}</td>
                            <td className="text-right py-3 px-4">{projection.activeUsers.toLocaleString()}</td>
                            <td className="text-right py-3 px-4">{projection.newUsers.toLocaleString()}</td>
                            <td className="text-right py-3 px-4">${projection.revenue.toLocaleString()}</td>
                            <td className="text-right py-3 px-4">
                              <span className={projection.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                ${projection.profit.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis Toggle */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className={`w-4 h-4 transition-transform ${showDetailedAnalysis ? 'rotate-90' : ''}`} />
                  {showDetailedAnalysis ? 'Ocultar' : 'Ver'} Análisis Detallado
                </Button>
              </div>

              {showDetailedAnalysis && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Competitive Advantages */}
                  <Card className="border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Ventajas Competitivas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {MARKET_INSIGHTS.competitiveAdvantages.map((advantage, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                            <span className="text-sm">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Market Challenges */}
                  <Card className="border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Desafíos del Mercado
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {MARKET_INSIGHTS.marketChallenges.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <Zap className="w-4 h-4 text-yellow-500 mr-2 mt-1" />
                            <span className="text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Empezar?
          </h2>
          <p className="text-xl mb-8">
            Elige el plan que mejor se adapte a tus necesidades y comienza tu viaje de aprendizaje hoy mismo
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-8 py-4 text-lg"
          >
            Explora los Programas <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
