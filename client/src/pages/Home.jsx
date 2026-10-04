import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import Benefits from '../components/home/Benefits.jsx';

export function Home() {
    return (
        <main>
            <HeroCarousel />
            <SustainableMaterials />
            <FeaturedProducts />
            <Benefits />
        </main>
    )
}