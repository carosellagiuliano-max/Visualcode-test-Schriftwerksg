// Import product images
import hydratingShampoo from '@/assets/products/hydrating-shampoo.jpg';
import volumeShampoo from '@/assets/products/volume-shampoo.jpg';
import colorProtectShampoo from '@/assets/products/color-protect-shampoo.jpg';
import repairConditioner from '@/assets/products/repair-conditioner.jpg';
import moisturizingConditioner from '@/assets/products/moisturizing-conditioner.jpg';
import heatProtectionSpray from '@/assets/products/heat-protection-spray.jpg';
import texturizingSpray from '@/assets/products/texturizing-spray.jpg';
import hairOil from '@/assets/products/hair-oil.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  usage: string;
  price: string;
  image: string;
}

export interface ProductCategory {
  category: string;
  items: Product[];
}

export const products: ProductCategory[] = [
  {
    category: 'Trinity Haircare Shampoos',
    items: [
      {
        id: 'hydrating-shampoo',
        name: 'Hydrating Shampoo',
        description: 'Intensive Feuchtigkeit für trockenes Haar',
        detailedDescription: 'Das Hydrating Shampoo versorgt trockenes und strapaziertes Haar mit intensiver Feuchtigkeit. Die spezielle Formel mit natürlichen Inhaltsstoffen reinigt sanft und hinterlässt das Haar geschmeidig und glänzend.',
        usage: 'Auf das nasse Haar auftragen, sanft einmassieren und gründlich ausspülen. Bei Bedarf wiederholen. Für beste Ergebnisse mit dem passenden Conditioner verwenden.',
        price: 'CHF 28',
        image: hydratingShampoo
      },
      {
        id: 'volume-shampoo',
        name: 'Volume Shampoo',
        description: 'Für mehr Volumen und Fülle',
        detailedDescription: 'Das Volume Shampoo verleiht feinem und kraftlosem Haar mehr Volumen und Fülle. Die leichte Formel beschwert das Haar nicht und sorgt für langanhaltenden Volumen-Effekt vom Ansatz bis in die Spitzen.',
        usage: 'Gleichmäßig im nassen Haar verteilen, aufschäumen und gründlich ausspülen. Für maximales Volumen mit dem Volume Conditioner kombinieren.',
        price: 'CHF 28',
        image: volumeShampoo
      },
      {
        id: 'color-protect-shampoo',
        name: 'Color Protect Shampoo',
        description: 'Schutz für coloriertes Haar',
        detailedDescription: 'Das Color Protect Shampoo wurde speziell für coloriertes Haar entwickelt. Es schützt die Haarfarbe vor dem Verblassen und bewahrt die Farbintensität für langanhaltende Brillanz.',
        usage: 'Sanft ins nasse Haar einmassieren, kurz einwirken lassen und gründlich ausspülen. Verwenden Sie lauwarmes Wasser für optimalen Farbschutz.',
        price: 'CHF 32',
        image: colorProtectShampoo
      }
    ]
  },
  {
    category: 'Trinity Haircare Conditioner',
    items: [
      {
        id: 'repair-conditioner',
        name: 'Repair Conditioner',
        description: 'Intensive Reparatur für geschädigtes Haar',
        detailedDescription: 'Der Repair Conditioner repariert und stärkt geschädigtes Haar von innen heraus. Die intensive Pflegeformel glättet die Haaroberfläche und reduziert Haarbruch spürbar.',
        usage: 'Nach dem Shampoo in die Längen und Spitzen einarbeiten, 2-3 Minuten einwirken lassen und gründlich ausspülen. Bei stark geschädigtem Haar täglich anwenden.',
        price: 'CHF 30',
        image: repairConditioner
      },
      {
        id: 'moisturizing-conditioner',
        name: 'Moisturizing Conditioner',
        description: 'Tiefenwirksame Pflege',
        detailedDescription: 'Der Moisturizing Conditioner spendet dem Haar tiefenwirksame Feuchtigkeit und macht es geschmeidig und kämmbar. Ideal für die tägliche Anwendung bei normalem bis trockenem Haar.',
        usage: 'Nach dem Shampoo vom Ansatz bis in die Spitzen verteilen, 1-2 Minuten einwirken lassen und ausspülen. Für beste Ergebnisse regelmäßig verwenden.',
        price: 'CHF 28',
        image: moisturizingConditioner
      }
    ]
  },
  {
    category: 'Styling Produkte',
    items: [
      {
        id: 'heat-protection-spray',
        name: 'Heat Protection Spray',
        description: 'Schutz vor Hitze bis 230°C',
        detailedDescription: 'Das Heat Protection Spray schützt das Haar zuverlässig vor Hitzeschäden durch Föhn, Glätteisen oder Lockenstab. Es bildet eine unsichtbare Schutzschicht und bewahrt die Haargesundheit.',
        usage: 'Vor dem Styling auf das handtuchtrockene Haar sprühen und gleichmäßig verteilen. Nicht ausspülen. Anschließend wie gewohnt stylen.',
        price: 'CHF 24',
        image: heatProtectionSpray
      },
      {
        id: 'texturizing-spray',
        name: 'Texturizing Spray',
        description: 'Für natürliche Textur und Halt',
        detailedDescription: 'Das Texturizing Spray verleiht dem Haar natürliche Textur und flexiblen Halt. Perfekt für Beach-Waves oder um feinem Haar mehr Griffigkeit zu geben.',
        usage: 'Auf das trockene oder leicht feuchte Haar sprühen und mit den Fingern einkneten. Für mehr Volumen kopfüber anwenden.',
        price: 'CHF 26',
        image: texturizingSpray
      },
      {
        id: 'hair-oil',
        name: 'Hair Oil',
        description: 'Nährendes Öl für Glanz und Geschmeidigkeit',
        detailedDescription: 'Das Hair Oil ist ein luxuriöses Pflegeöl, das dem Haar intensiven Glanz und seidige Geschmeidigkeit verleiht. Die leichte Formel fettet nicht und eignet sich für alle Haartypen.',
        usage: 'Wenige Tropfen in die Handflächen verteilen und in die Längen und Spitzen einarbeiten. Kann auf trockenem oder feuchtem Haar angewendet werden.',
        price: 'CHF 35',
        image: hairOil
      }
    ]
  },
  {
    category: 'TAILOR\'s Care Serie',
    items: [
      {
        id: 'tailors-daily-shampoo',
        name: 'Daily Shampoo',
        description: 'Tägliche Reinigung für alle Haartypen',
        detailedDescription: 'Das Daily Shampoo von TAILOR\'s reinigt das Haar sanft und gründlich. Die ausgewogene Formel eignet sich für die tägliche Anwendung und alle Haartypen.',
        usage: 'Ins nasse Haar einmassieren, aufschäumen und gründlich ausspülen.',
        price: 'CHF 26',
        image: hydratingShampoo
      },
      {
        id: 'tailors-conditioner',
        name: 'Daily Conditioner',
        description: 'Tägliche Pflege und Geschmeidigkeit',
        detailedDescription: 'Der Daily Conditioner spendet dem Haar Feuchtigkeit und macht es kämmbar. Perfekt für die tägliche Pflege-Routine.',
        usage: 'Nach dem Shampoo in die Längen einarbeiten, kurz einwirken lassen und ausspülen.',
        price: 'CHF 24',
        image: moisturizingConditioner
      }
    ]
  },
  {
    category: 'TAILOR\'s Styling Serie',
    items: [
      {
        id: 'tailors-pomade',
        name: 'Classic Pomade',
        description: 'Klassisches Styling mit starkem Halt',
        detailedDescription: 'Die Classic Pomade bietet starken Halt für klassische Herrenfrisuren. Wasserlöslich und rückstandslos auswaschbar.',
        usage: 'Kleine Menge in den Handflächen verreiben und ins handtuchtrockene Haar einarbeiten.',
        price: 'CHF 28',
        image: texturizingSpray
      },
      {
        id: 'tailors-clay',
        name: 'Matte Clay',
        description: 'Mattes Finish mit flexiblem Halt',
        detailedDescription: 'Die Matte Clay verleiht einen natürlichen, matten Look mit flexiblem Halt. Ideal für strukturierte Styles.',
        usage: 'Ins trockene oder leicht feuchte Haar einarbeiten und nach Wunsch stylen.',
        price: 'CHF 30',
        image: hairOil
      }
    ]
  },
  {
    category: 'TAILOR\'s Shaving Serie',
    items: [
      {
        id: 'tailors-shaving-cream',
        name: 'Shaving Cream',
        description: 'Reichhaltige Rasiercreme für die perfekte Rasur',
        detailedDescription: 'Die Shaving Cream sorgt für eine sanfte und gründliche Rasur. Die reichhaltige Formel schützt die Haut vor Irritationen.',
        usage: 'Mit einem Rasierpinsel oder den Händen aufschäumen und auf die angefeuchtete Haut auftragen.',
        price: 'CHF 22',
        image: heatProtectionSpray
      },
      {
        id: 'tailors-aftershave',
        name: 'After Shave Balm',
        description: 'Beruhigender Balsam nach der Rasur',
        detailedDescription: 'Der After Shave Balm beruhigt die Haut nach der Rasur und spendet Feuchtigkeit. Ohne Alkohol, daher brennt er nicht.',
        usage: 'Nach der Rasur auf die gereinigte Haut auftragen und sanft einmassieren.',
        price: 'CHF 26',
        image: repairConditioner
      }
    ]
  }
];