export class HotelImageHelper {
  private static readonly SPECIFIC_IMAGES: Record<string, string> = {
    "Juma Amazon Lodge": "/images/hotels/paradisiacal/juma-1.jpg",
    "Haus Hirt": "/images/hotels/paradisiacal/haus-7.png",
  };

  private static readonly PLACEHOLDERS = [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1724947053227-2335bf21d0ae?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560703649-e3055f28bcf8?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592555059503-0a774cb8d477?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562809896-1b1514f40708?w=1920&q=80&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1675745330148-1f7e5a7674a5?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598904326301-4c9cb279a3f6?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560200353-ce0a76b1d438?w=1920&q=80&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1681922761648-d5e2c3972982?w=1920&q=80&auto=format&fit=crop",
  ];

  static getImage(hotelId: string = "default", hotelName?: string): string {
    if (hotelName && this.SPECIFIC_IMAGES[hotelName]) {
      return this.SPECIFIC_IMAGES[hotelName];
    }

    let hash = 0;
    for (let i = 0; i < hotelId.length; i++) {
      hash = hotelId.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % this.PLACEHOLDERS.length;
    return `${this.PLACEHOLDERS[index]}?w=1920&q=80&auto=format&fit=crop`;
  }
}
