'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomLink } from '@/app/components/custom-link/CustomLink'
import { servicesData } from '@/app/data/services-data'
import './style.scss'

export default function HomePrice() {
    const [activeTab, setActiveTab] = useState('building')

    const priceBuilding = servicesData.find((c) => c.description === 'building')?.items ?? []
    const priceDesign = servicesData.find((c) => c.description === 'design')?.items ?? []

    return (
        <div className='home-price'>
            <div className='container'>
                <div className='switch'>
                    <h2>Стоимость услуг</h2>
                    <div className='switch-box'>
                        <button 
                            className={`switch-button ${activeTab === 'building' ? 'active' : ''}`}
                            onClick={() => setActiveTab('building')}
                        >
                            Строительство
                        </button>
                        <button 
                            className={`switch-button ${activeTab === 'design' ? 'active' : ''}`}
                            onClick={() => setActiveTab('design')}
                        >
                            Проектирование
                        </button>
                    </div>
                </div>
                <div className='price-box'>
                    <AnimatePresence mode="wait">
                        {activeTab === 'building' ? (
                            <motion.div
                                key="building"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="price-box-content"
                            >
                                {priceBuilding.map((item, index) => (
                                    <CustomLink
                                        href={`/services/building-${item.description}`}
                                        className='price-card'
                                        key={`building-${item.description}-${index}`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className='title'>{item.name}</p>
                                            <p className='price'>от <span>{item.price}</span> руб/м²</p>
                                        </motion.div>
                                    </CustomLink>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="design"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="price-box-content"
                            >
                                {priceDesign.map((item, index) => (
                                    <CustomLink
                                        href={`/services/design-${item.description}`}
                                        className='price-card'
                                        key={`design-${item.description}-${index}`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className='title'>{item.name}</p>
                                            <p className='price'>от <span>{item.price}</span> руб/м²</p>
                                        </motion.div>
                                    </CustomLink>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}