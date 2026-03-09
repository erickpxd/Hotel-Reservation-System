export function FeaturesSection() {
  return (
    <section className="bg-[#003B95] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-x-50 gap-y-16">
        
        <div className="space-y-5 text-center">
          <h3 className="text-xl font-bold text-gray-100">Discover Unique Destinations</h3>
          <p className="text-gray-50 leading-relaxed">
            From tropical escapes to alpine retreats, explore inspiring hotels worldwide. Your next journey begins here.
          </p>
        </div>

        <div className="space-y-5 text-center">
          <h3 className="text-xl font-bold text-gray-100">Experience Luxury in Every Detail</h3>
          <p className="text-gray-50 leading-relaxed">
            Stay in style with hotels that redefine comfort and elegance. Breathtaking views and service made for you.
          </p>
        </div>

        <div className="space-y-5 text-center mx-3">
          <h3 className="text-xl font-bold text-gray-100 mx-5">Connect with Nature</h3>
          <p className="text-gray-50 leading-relaxed">
            Find peace in secluded and pristine locations. Jungle bungalows, mountain chalets, and untouched beaches await.
          </p>
        </div>

      </div>
    </section>
  );
}