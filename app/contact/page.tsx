'use client';

import React from 'react';
import { Mail, Phone, Send, Linkedin, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  const contactInfo = {
    name: 'Nitesh Ghimire',
    email: 'niteshghimire223@gmail.com',
    phone: '+977 9829300271',
    whatsappLink: 'https://wa.me/9779829300271', 
    telegramLink: 'https://t.me/+9779829300271', 
    linkedinLink: 'https://www.linkedin.com/in/menitesh', 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., Server Actions or API call)
    console.log('Form submitted');
  };

  return (
    <section className=" bg-background py-12 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        
        {/* Header Section */}
        <div className="mb-10 text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or want to discuss technology? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Contact Details */}
          <div className="space-y-6">
            <Card className="h-full border-none shadow-none bg-transparent md:bg-card/50 md:border md:shadow-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reachable via Email, WhatsApp, or Telegram.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Email */}
                <div className="flex items-center space-x-4 p-3 rounded-md hover:bg-accent/50 transition-colors group">
                  <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-foreground font-semibold hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4 p-3 rounded-md hover:bg-accent/50 transition-colors group">
                  <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-foreground font-semibold hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Social Actions */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground px-3">Quick Connect</p>
                  <div className="flex flex-wrap gap-3 px-3">
                    <a 
                      href={contactInfo.whatsappLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="gap-2">
                        <MessageCircle size={18} className="text-green-600" />
                        WhatsApp
                      </Button>
                    </a>
                    
                    <a 
                      href={contactInfo.telegramLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="gap-2">
                        <Send size={18} className="text-blue-500" />
                        Telegram
                      </Button>
                    </a>

                    <a 
                      href={contactInfo.linkedinLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="gap-2">
                        <Linkedin size={18} className="text-blue-700" />
                        LinkedIn
                      </Button>
                    </a>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

         
        </div>
      </div>
    </section>
  );
}