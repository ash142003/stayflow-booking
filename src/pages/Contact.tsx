import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const Schema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10) });

export default function ContactPage() {
  const form = useForm<z.infer<typeof Schema>>({ resolver: zodResolver(Schema), defaultValues: { name: "", email: "", message: "" } });

  function onSubmit() {
    toast({ title: "Message sent (demo)", description: "We'll get back to you shortly." });
    form.reset();
  }

  return (
    <div className="container py-8">
      <Helmet>
        <title>Contact Us | StayEase</title>
        <meta name="description" content="Get in touch with StayEase. Find our address, phone number, and location map." />
        <link rel="canonical" href={window.location.origin + "/contact"} />
      </Helmet>
      <h1 className="text-3xl font-bold">Contact</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <section className="rounded-lg border p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl><Textarea rows={5} placeholder="How can we help?" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-end"><Button type="submit">Send</Button></div>
            </form>
          </Form>
        </section>
        <aside className="space-y-4">
          <div className="rounded-lg border overflow-hidden">
            <iframe
              title="StayEase Location Map"
              src="https://www.google.com/maps?q=Times%20Square%2C%20New%20York&output=embed"
              className="h-[320px] w-full"
              loading="lazy"
            />
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Our Address</h2>
            <p className="mt-2 text-muted-foreground">123 Midtown Ave, New York, NY</p>
            <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
            <p className="text-muted-foreground">Email: hello@stayease.com</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
