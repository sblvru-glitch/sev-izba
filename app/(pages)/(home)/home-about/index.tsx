import './style.scss'
import Image from 'next/image'

export default function HomeAbout() {
    return (
        <div className='home-about'>
            <div className='container'>
                <h2>О нас</h2>
                <div className='home-about-info'>
                    <Image
                        src="/site-modules/director.png"
                        alt="Home About"
                        width={250}
                        height={250}
                        sizes="250px"
                    />
                    <div className='home-about-info-list'>
                        <ul>
                            <li>
                                <span>на рынке</span>
                                <p>Более 18 лет</p>
                            </li>
                            <li>
                                <span>построено</span>
                                <p>400+ объектов</p>
                            </li>
                            <li>
                                <span>директор компании &quot;Северная&nbsp;Изба&quot;</span>
                                <p>Максим Бельский</p>
                            </li>
                        </ul>
                    </div>
                    <div className='home-about-info-text'>
                        <p>
                            <span>Строительная компания &quot;Северная&nbsp;Изба&quot;</span><br />
                            — это уникальное сочетание традиций русского 
                            зодчества и современных технологий строительства 
                            домов из дерева. Основное направление — 
                            возведение деревянных домов, бань, беседок и других 
                            построек. Профессиональные знания и опыт, экологически 
                            чистые пиломатериалы позволяют создавать дома 
                            по индивидуальным и типовым проектам. 
                            Основные преимущества компании — богатый опыт, 
                            ответственность, профессионализм и точное соблюдение сроков.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}