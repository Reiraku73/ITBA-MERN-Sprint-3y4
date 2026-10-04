import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import Benefits from '../components/home/Benefits.jsx';
import SustainableMaterials from '../components/home/SustainableMaterials.jsx';

export function Home() {
    return (
        <main>
            <HeroCarousel />
            <FeaturedProducts />
            <Benefits />
            <SustainableMaterials />
        </main>
    )
}