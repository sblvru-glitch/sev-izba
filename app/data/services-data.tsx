export const servicesData = [
    {
        id: 1,
        name: 'Строительство',
        description: 'building',
        items: [
            { 
                name: 'Клееный брус',
                description: 'lumber',
                price: '35 000',
                info: 'То, с чего начинался Smart Wood — классические дома из бревна. Здесь мы выделяем для себя два принципиально разных подхода к строительству — классический усадочный и нетрадиционный безусадочный, который стал нашей личной разработкой. Выбор технологии и любое последующее наше действие при строительстве деревянного дома отталкивается от того, как будет вести себя строение в процессе эксплуатации — за годы работы мы досконально изучили все возможные сложности, связанные с деревом, и всегда держим в уме несколько вариантов решения задачи с усадкой. Мы стремимся к тому, чтобы ваша жизнь в таком доме была легкой, а значит — к сокращению количества так называемых домкратов или элементов, которые потребуют обслуживания.'
            },
            { 
                name: 'Профилированный брус',
                description: 'profile',
                price: '25 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Ручная рубка - срубы',
                description: 'manual-logging',
                price: '25 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Дома Post and Beam',
                description: 'post-and-beam',
                price: '35 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Оцилиндрованное бревно',
                description: 'round-logs',
                price: '18 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Канадская рубка',
                description: 'canadian-logging',
                price: '22 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
        ]
    },
    {
        id: 2,
        name: 'Проектирование',
        description: 'design',
        items: [
            {
                name: 'Проектирование',
                description: 'design',
                price: '100 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Стандартный',
                description: 'standard',
                price: '150 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Премиум',
                description: 'premium',
                price: '200 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Дизайн-проект',
                description: 'design-project',
                price: '100 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: '3D-визуализация',
                description: '3d-visualization',
                price: '100 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
            {
                name: 'Дизайн-проект',
                description: 'design-project-extended',
                price: '100 000',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            },
        ]
    },
]

/** Все slug страниц услуг для статической генерации */
export function getAllServiceSlugs(): { 'services-info': string }[] {
    return servicesData.flatMap((category) =>
        category.items.map((item) => ({
            'services-info': `${category.description}-${item.description}`,
        }))
    )
}

/** Slug в URL: "categoryDescription-itemDescription", например building-lumber, design-3d-visualization */
export function getServiceItemBySlug(slug: string) {
    for (const category of servicesData) {
        const item = category.items.find(
            (i) => slug === `${category.description}-${i.description}`
        )
        if (item)
            return {
                ...item,
                categoryName: category.name,
                categoryDescription: category.description,
            }
    }
    return null
}