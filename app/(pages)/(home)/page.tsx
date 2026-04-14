import HomeCatalog from './home-catalog'
import HomeAbout from './home-about'
import HomeWorks from './home-works'
import HomeMain from './home-main'
import HomePrice from './home-price'
import HomePlus from './home-plus'
import HomeSteps from './home-steps'



export default function Home() {
  return (
    <>
      <HomeMain />
      <HomePlus />
      <HomeCatalog />
      <HomeSteps />
      <HomeWorks />
      <HomePrice />
      <HomeAbout />
    </>
  )
}

