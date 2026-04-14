import './style.scss'
import Image from 'next/image'

export default function HomeAbout() {
    return (
        <div className='home-about'>
            <div className='container'>
                <div className="home-about-img">
                    <div className="home-about-img-container"></div>
                    <div className="home-about-img-description">
                        2004<br/><span>год основания</span>
                    </div>
                </div>
                <div className="home-about-info">
                    <h2>О компании</h2>
                    <p className="home-about-info-description">
                        Строим с душой более 20-ти лет
                    </p>
                    <p>
                        Северная изба — это уникальное сочетание традиций русского зодчества и современных технологий строительства домов из дерева. 
                        Мы не просто строим — мы создаём пространства, где хочется жить. 
                        Каждый проект начинается с вашего образа: а что Вы чувствуете, входя домой?
                        <br /><br />
                        Работаем только с сертифицированными материалами, используем премиальное дерево 
                        Северных пород — оно плотнее, долговечнее и теплее. Команда профессионалов с опытом.
                    </p>
                    <div className="home-about-info-numbers">
                        <div className="home-about-info-numbers-item">
                            340+<br/><span>проектов</span>
                        </div>
                        <div className="home-about-info-numbers-item">
                            98%<br/><span>рекомендуют</span>
                        </div>
                        <div className="home-about-info-numbers-item">
                            47<br/><span>мастеров</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}