import ContactForm from "@/components/contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Nilesh Pawar",
  description: "Get in touch with Nilesh Pawar",
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <ContactForm />
    </main>
  )
}

