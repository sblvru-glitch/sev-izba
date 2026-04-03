import './style.scss'
import Image from 'next/image'
import { CustomLink } from '@/app/components/custom-link/CustomLink'
import { pluralizeWorksPhotos, worksData } from '@/app/data/works-data'

export default function HomeWorks() {

    return (
        <div className='home-works'>
            <div className='container'>
                <h2>Наши работы</h2>
                <div className="works-content">
                    {worksData.map((category, index) => {
                        const cover = category.images[0]
                        const count = category.images.length
                        return (
                            <CustomLink
                                key={category.id}
                                href={`/works/${category.description}`}
                                className="works-content__item"
                            >
                                <div className="works-content__item-image">
                                    <Image
                                        src={cover}
                                        alt=""
                                        fill
                                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        loading={index < 2 ? 'eager' : 'lazy'}
                                        priority={index < 2}
                                    />
                                </div>
                                <div className="works-content__item-title">
                                    <h3>{category.name}</h3>
                                    <p>
                                        {count} {pluralizeWorksPhotos(count)}
                                    </p>
                                </div>
                            </CustomLink>
                        )
                    })}
                </div>
                <CustomLink href="/works">
                    <button  className='home-works-gallery-button'>Посмотреть все работы</button>
                </CustomLink>
            </div>
        </div>
    )
}