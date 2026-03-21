import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Facebook, 
  Send,
  MapPin
} from "lucide-react";

import { API_URL } from "@/lib/api-config";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ntb069@gmail.com",
      action: "mailto:ntb069@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+94 763629126",
      action: "tel:+94763629126"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Tharusha Bhashitha",
      action: "https://www.linkedin.com/in/tharusha-bhashitha-b985b42b9/"
    },
    {
      icon: Facebook,
      label: "Page",
      value: "Artwave Innovations",
      action: "https://web.facebook.com/ArtwaveInnovations"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: data.message || "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error Sending Message",
          description: data.message || "There was a problem sending your message. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Submission Error",
        description: "Could not connect to the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'd love to hear about your project and see how we can work together! Whether you need 
              DevOps expertise, system automation, or creative design work, I'm here to help bring 
              your ideas to life. Reach out through any channel below - I'm quick to respond and 
              excited to chat about your vision.
            </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                
                return (
                  <div 
                    key={contact.label}
                    className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border hover:border-primary smooth-transition cursor-pointer group"
                    onClick={() => window.open(contact.action, '_blank')}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{contact.label}</div>
                      <div className="text-muted-foreground text-sm">{contact.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location */}
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Location</h4>
              </div>
              <p className="text-muted-foreground">
                Vavuniya, Northern Province, Sri Lanka
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Available for remote work and local consultations
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or how I can help you..."
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              * Required fields. I typically respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;