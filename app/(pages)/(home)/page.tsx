import HomeCatalog from './home-catalog'
import HomeAbout from './home-about'
import HomeWorks from './home-works'
import HomeMain from './home-main'
import HomePrice from './home-price'



export default function Home() {
  return (
    <>
      <HomeMain />
      {/* <HomeCatalog /> */}
      <HomeWorks />
      {/* <HomePrice /> */}
      <HomeAbout />
    </>
  )
}

