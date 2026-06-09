// @ts-nocheck
import { createCorsair, gmail, googlecalendar } from "corsair";

export const corsair = createCorsair({
  multiTenancy: true,
  kek: process.env.CORSAIR_KEK!,
  plugins: [gmail({ mode: "cautious" }), googlecalendar({ mode: "cautious" })],
});
