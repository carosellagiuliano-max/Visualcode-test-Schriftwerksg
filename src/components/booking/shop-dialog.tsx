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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

interface ShopDialogProps {
  children: React.ReactNode;
}

const ShopDialog = ({ children }: ShopDialogProps) => {
  const { addToCart } = useCart();

  const products = [
    {
      category: 'Trinity Haircare Shampoos',
      items: [
        {
          id: 'hydrating-shampoo',
          name: 'Hydrating Shampoo',
          description: 'Intensive Feuchtigkeit für trockenes Haar',
          price: 'CHF 28'
        },
        {
          id: 'volume-shampoo',
          name: 'Volume Shampoo',
          description: 'Für mehr Volumen und Fülle',
          price: 'CHF 28'
        },
        {
          id: 'color-protect-shampoo',
          name: 'Color Protect Shampoo',
          description: 'Schutz für coloriertes Haar',
          price: 'CHF 32'
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
          price: 'CHF 30'
        },
        {
          id: 'moisturizing-conditioner',
          name: 'Moisturizing Conditioner',
          description: 'Tiefenwirksame Pflege',
          price: 'CHF 28'
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
          price: 'CHF 24'
        },
        {
          id: 'texturizing-spray',
          name: 'Texturizing Spray',
          description: 'Für natürliche Textur und Halt',
          price: 'CHF 26'
        },
        {
          id: 'hair-oil',
          name: 'Hair Oil',
          description: 'Nährendes Öl für Glanz und Geschmeidigkeit',
          price: 'CHF 35'
        }
      ]
    }
  ];

  const handleAddToCart = (product: any, category: string) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: category
    });
    toast.success(`${product.name} wurde zum Warenkorb hinzugefügt`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-foreground flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Shop - Unsere Produkte
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
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium text-foreground">
                          {product.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-sm">
                          {product.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-3">
                        {product.description}
                      </p>
                      <Button
                        onClick={() => handleAddToCart(product, category.category)}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        In den Warenkorb
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Alle Produkte können direkt im Salon erworben oder per WhatsApp bestellt werden.
            Gerne beraten wir Sie persönlich über die passenden Produkte für Ihr Haar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopDialog;