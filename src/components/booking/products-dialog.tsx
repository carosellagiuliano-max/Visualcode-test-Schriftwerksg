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
import { products } from '@/data/products';

interface ProductsDialogProps {
  children: React.ReactNode;
}

const ProductsDialog = ({ children }: ProductsDialogProps) => {

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
        
        <div className="space-y-8 mt-6">
          {/* Trinity Haircare Produkte */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Trinity Haircare Premium Produkte</h2>
              <p className="text-muted-foreground text-sm">Professionelle Haarpflege für optimale Ergebnisse</p>
            </div>
            {products.filter(category => category.category.includes('Trinity')).map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                  {category.category}
                </h3>
                <div className="grid gap-4">
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
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base font-medium text-foreground">
                                {product.name}
                              </CardTitle>
                              <Badge variant="secondary" className="text-sm ml-2 flex-shrink-0">
                                {product.price}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <CardDescription className="text-muted-foreground text-sm">
                                {product.detailedDescription}
                              </CardDescription>
                              <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                                <strong>Anwendung:</strong> {product.usage}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TAILOR's Grooming Produkte */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">TAILOR's Grooming Produkte</h2>
              <p className="text-muted-foreground text-sm">Moderne Herrenpflege für den anspruchsvollen Mann</p>
            </div>
            {products.filter(category => category.category.includes('TAILOR')).map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                  {category.category}
                </h3>
                <div className="grid gap-4">
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
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base font-medium text-foreground">
                                {product.name}
                              </CardTitle>
                              <Badge variant="secondary" className="text-sm ml-2 flex-shrink-0">
                                {product.price}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <CardDescription className="text-muted-foreground text-sm">
                                {product.detailedDescription}
                              </CardDescription>
                              <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                                <strong>Anwendung:</strong> {product.usage}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Styling Produkte */}
          {products.filter(category => category.category === 'Styling Produkte').map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-2">{category.category}</h2>
                <p className="text-muted-foreground text-sm">Professionelle Styling-Produkte für perfekte Frisuren</p>
              </div>
              <div className="grid gap-4">
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
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base font-medium text-foreground">
                              {product.name}
                            </CardTitle>
                            <Badge variant="secondary" className="text-sm ml-2 flex-shrink-0">
                              {product.price}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <CardDescription className="text-muted-foreground text-sm">
                              {product.detailedDescription}
                            </CardDescription>
                            <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                              <strong>Anwendung:</strong> {product.usage}
                            </div>
                          </div>
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