import './style.scss'

export default function HomeSteps() {
    return (
        <div className='home-steps'>
            <div className='container'>
                <h2>Процесс строительства</h2>
                <p className='home-steps-description'>Как мы строим дом:</p>
                <div className='home-steps-list'>
                    <div className="home-steps-line"></div>
                    <div className='home-steps-item'>
                        <div className='home-steps-item-icon'>01</div>
                        <h3>Консультация</h3>
                        <p>Обсуждаем ваши пожелания, выбираем материал и стиль. Выезд на участок — бесплатно.</p>
                    </div>
                    <div className='home-steps-item'>
                        <div className='home-steps-item-icon'>02</div>
                        <h3>Проект</h3>
                        <p>Разрабатываем индивидуальный архитектурный и конструктивный проект, согласовываем каждую деталь.</p>
                    </div>
                    <div className='home-steps-item'>
                        <div className='home-steps-item-icon'>03</div>
                        <h3>Договор</h3>
                        <p>Фиксируем сроки, стоимость и технологии. Без скрытых доплат.</p>
                    </div>
                    <div className='home-steps-item'>
                        <div className='home-steps-item-icon'>04</div>
                        <h3>Строительство</h3>
                        <p>Возводим объект по чёткому графику с поэтапным подписанием актов. Еженедельные фотоотчёты в мессенджер.</p>
                    </div>
                    <div className='home-steps-item'>
                        <div className='home-steps-item-icon'>05</div>
                        <h3>Сдача</h3>
                        <p>Принимаете дом с полной документацией. Подписываем акт выполненных работ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}