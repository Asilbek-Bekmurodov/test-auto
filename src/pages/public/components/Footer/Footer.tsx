// Footer.tsx
import { Instagram, Send } from "lucide-react";
import Image from "../../../../components/Image/Image";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#050814] to-[#02040c] text-gray-300">
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image name="darkLogo" />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-md">
              Bizning platforma — O‘zbekiston bo‘ylab bo‘lajak haydovchilar
              uchun yaratilgan zamonaviy va qulay test tizimi bo‘lib,
              bilimlaringizni sinash, tayyorgarlik darajangizni baholash va
              imtihonlarga samarali tayyorlanishingizga yordam beradi.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Biz bilan bog‘lanish</h4>
            <a href="tel:+998935733342 " className="text-sm text-gray-400">
              Tel: +998 93 573-33-42{" "}
            </a>
            <p className="text-sm text-gray-400">
              Manzil: Toshkent shahri,
              <br />
              Ahmad Donish ko‘chasi, 20A
              <br />
              100180
            </p>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Ijtimoiy tarmoqlarimiz</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm hover:text-white transition">
                <a
                  href="https://www.instagram.com/avtomaktab_chorsu?igsh=djR2OWJycnVhcmpy"
                  className="flex items-center gap-3"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm hover:text-white transition">
                <a
                  className="flex items-center gap-3"
                  href="https://t.me/avtomaktab_chorsu_rasmiy"
                >
                  <Send className="w-4 h-4" /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-blue-500/40">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
          © 2026
        </div>
      </div>
    </footer>
  );
}
