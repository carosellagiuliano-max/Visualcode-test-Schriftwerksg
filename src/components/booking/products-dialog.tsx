import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';

// Import product images
import hydratingShampoo from '@/assets/products/hydrating-shampoo.jpg';
import volumeShampoo from '@/assets/products/volume-shampoo.jpg';
import colorProtectShampoo from '@/assets/products/color-protect-shampoo.jpg';
import repairConditioner from '@/assets/products/repair-conditioner.jpg';
import moisturizingConditioner from '@/assets/products/moisturizing-conditioner.jpg';
import heatProtectionSpray from '@/assets/products/heat-protection-spray.jpg';
import texturizingSpray from '@/assets/products/texturizing-spray.jpg';
import hairOil from '@/assets/products/hair-oil.jpg';

interface ProductsDialogProps {
  children: React.ReactNode;
}

const ProductsDialog = ({ children }: ProductsDialogProps) => {
  const products = [
    {
      category: 'Trinity Haircare Shampoos',
      items: [
        {
          name: 'Hydrating Shampoo',
          description: 'Intensive Feuchtigkeit für trockenes Haar',
          price: 'CHF 28',
          image: hydratingShampoo
        },
        {
          name: 'Volume Shampoo',
          description: 'Für mehr Volumen und Fülle',
          price: 'CHF 28',
          image: volumeShampoo
        },
        {
          name: 'Color Protect Shampoo',
          description: 'Schutz für coloriertes Haar',
          price: 'CHF 32',
          image: colorProtectShampoo
        }
      ]
    },
    {
      category: 'Trinity Haircare Conditioner',
      items: [
        {
          name: 'Repair Conditioner',
          description: 'Intensive Reparatur für geschädigtes Haar',
          price: 'CHF 30',
          image: repairConditioner
        },
        {
          name: 'Moisturizing Conditioner',
          description: 'Tiefenwirksame Pflege',
          price: 'CHF 28',
          image: moisturizingConditioner
        }
      ]
    },
    {
      category: 'Styling Produkte',
      items: [
        {
          name: 'Heat Protection Spray',
          description: 'Schutz vor Hitze bis 230°C',
          price: 'CHF 24',
          image: heatProtectionSpray
        },
        {
          name: 'Texturizing Spray',
          description: 'Für natürliche Textur und Halt',
          price: 'CHF 26',
          image: texturizingSpray
        },
        {
          name: 'Hair Oil',
          description: 'Nährendes Öl für Glanz und Geschmeidigkeit',
          price: 'CHF 35',
          image: hairOil
        }
      ]
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-foreground flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Unsere Produkte
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Hochwertige Trinity Haircare Produkte für die perfekte Haarpflege zu Hause
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {products.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                {category.category}
              </h3>
                <div className="grid md:grid-cols-2 gap-4">
                 {category.items.map((product, productIndex) => (
                   <Card key={productIndex} className="border-border">
                     <CardContent className="p-4">
                       <div className="flex gap-4">
                         <div className="flex-shrink-0">
                           <img 
                             src={product.image} 
                             alt={product.name}
                             className="w-20 h-20 object-cover rounded-md border border-border"
                           />
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start mb-2">
                             <CardTitle className="text-base font-medium text-foreground">
                               {product.name}
                             </CardTitle>
                             <Badge variant="secondary" className="text-sm ml-2 flex-shrink-0">
                               {product.price}
                             </Badge>
                           </div>
                           <CardDescription className="text-muted-foreground text-sm">
                             {product.description}
                           </CardDescription>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Alle Produkte können direkt im Salon erworben werden. 
            Gerne beraten wir Sie persönlich über die passenden Produkte für Ihr Haar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsDialog;