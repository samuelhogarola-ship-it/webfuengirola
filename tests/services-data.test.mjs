import assert from "node:assert/strict";
import test from "node:test";

import { services } from "../data/services-data.mjs";

test("the maintenance generator preserves the approved plans and prices", () => {
  const maintenance = services.find(
    (service) => service.slug === "mantenimiento",
  );

  assert.ok(maintenance);
  assert.equal(maintenance.price, "Desde 60€/mes");
  assert.match(maintenance.metaDescription, /desde 60€\/mes/i);
  assert.match(maintenance.bodyHtml, /Horas sueltas/);
  assert.match(maintenance.bodyHtml, /50 €\/hora/);
  assert.match(maintenance.bodyHtml, /Mantenimiento básico/);
  assert.match(maintenance.bodyHtml, /60 €\/mes/);
  assert.match(maintenance.bodyHtml, /hasta 4 cambios ligeros al mes/i);
  assert.match(maintenance.bodyHtml, /Marketing y Presencia Digital/);
  assert.match(maintenance.bodyHtml, /200 €\/mes/);
  assert.match(maintenance.bodyHtml, /Cero Preocupaciones/);
  assert.match(maintenance.bodyHtml, /400 €\/mes\. 10 horas al mes/);
  assert.match(maintenance.bodyHtml, /Bono Prioritario/);
  assert.match(maintenance.bodyHtml, /550 €\/mes\. 11 horas al mes/);
  assert.doesNotMatch(maintenance.bodyHtml, /Bono Flexible/);
});
