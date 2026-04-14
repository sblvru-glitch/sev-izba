import './style.scss'

export default function HomePlus() {
    return (
        <div className='home-plus'>
            <div className='container'>
                <div className='home-plus-item'>
                    <div className="home-plus-item-icon">01</div>
                    <h2>Архитектурный проект</h2>
                    <p>Создадим индивидуальный проект с учетом рельефа участка, ваших пожеланий и бюджета.</p>
                </div>
                <div className='home-plus-item'>
                    <div className="home-plus-item-icon">02</div>
                    <h2>Строительство бань</h2>
                    <p>Русские бани, финские сауны и банные комплексы из отборного северного леса.</p>
                </div>
                <div className='home-plus-item'>
                    <div className="home-plus-item-icon">03</div>
                    <h2>Доставка и монтаж</h2>
                    <p>Собственная логистика и монтажные бригады.</p>
                </div>
                <div className='home-plus-item'>
                    <div className="home-plus-item-icon">04</div>
                    <h2>Гарантия и сервис</h2>
                    <p>Гарантия по договору на несущие конструкции и кровлю 10 лет.</p>
                </div>
            </div>
        </div>
    )
}