"use client";

import { useState } from "react";
import { BurgerMenuBlock } from "./burger-menu-block";
import FormWindow from "../form_window/form_window";
import type { BurgerNavItem } from "./burger-menu-block";

type Props = {
  navItems: readonly BurgerNavItem[];
};

export function ContactButton({ navItems }: Props) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setFormOpen(true)}>
        Оставить заявку
      </button>
      <BurgerMenuBlock navItems={navItems} />
      <FormWindow open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
