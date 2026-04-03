import './style.scss'

export default function HomeCatalog() {
  return (
    <div className='home-catalog'>
      <div className='content'>
        <div className='info'>
          <h2>
            Каталог
            проектов
          </h2>
          <p>
            В каталоге представлен
            широкий спектр архитектурных
            решений, воплощающих
            гармоничное сочетание
            функциональности и&nbsp;эстетики.
            <br />
            <br />
            Каждый проект детально
            проработан с учетом новейших
            тенденций в области дизайна
            и&nbsp;строительства, отражая
            уникальный подход к&nbsp;созданию
            премиальных жилых пространств.
          </p>
          <button>
            Весь каталог
          </button>
        </div>
        <div className='gallery-container'>
        </div>
      </div>
    </div>
  )
}