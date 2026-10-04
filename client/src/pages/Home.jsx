import HeroCarousel from '../components/home/HeroCarousel';
import NewsLetter from '../components/home/Newsletter';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import Benefits from '../components/home/Benefits.jsx';
import SustainableMaterials from '../components/home/SustainableMaterials.jsx';
import Opinions from '../components/home/Opinions.jsx';
import Story from '../components/home/StorySection.jsx';

export function Home({ onAgregar }) {
    return (
        <main>
            <HeroCarousel />
            <Story />
            <FeaturedProducts onAgregar={onAgregar} />
            <Benefits />
            <SustainableMaterials />
            <Opinions />
            <NewsLetter />
        </main>
    )
}