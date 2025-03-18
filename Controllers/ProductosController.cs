﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Roles_Estructuras_Control.Data;
using Roles_Estructuras_Control.Models;

namespace Roles_Estructuras_Control.Controllers
{
    public class ProductosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductosController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> ListaProductos()
        {
            var productos = await _context.Productos
                .Select(p => new { p.ID, p.NombreProducto })
                .ToListAsync();

            return Json(productos);
        }

        // GET: Productos
        public async Task<IActionResult> Index()
        {
            return View(await _context.Productos.ToListAsync());
        }

        // GET: Productos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();

            var productoModels = await _context.Productos.FirstOrDefaultAsync(m => m.ID == id);
            if (productoModels == null)
                return NotFound();

            return View(productoModels);
        }

        // GET: Productos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Productos/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,NombreProducto,Presentacion,CodigoBarras")] ProductoModels productoModels)
        {
            if (ModelState.IsValid)
            {
                _context.Add(productoModels);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(productoModels);
        }

        // GET: Productos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
                return NotFound();

            var productoModels = await _context.Productos.FindAsync(id);
            if (productoModels == null)
                return NotFound();

            return View(productoModels);
        }

        // POST: Productos/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,NombreProducto,Presentacion,CodigoBarras")] ProductoModels productoModels)
        {
            if (id != productoModels.ID)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(productoModels);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductoModelsExists(productoModels.ID))
                        return NotFound();
                    else
                        throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(productoModels);
        }

        // GET: Productos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();

            var productoModels = await _context.Productos.FirstOrDefaultAsync(m => m.ID == id);
            if (productoModels == null)
                return NotFound();

            return View(productoModels);
        }

        // POST: Productos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var productoModels = await _context.Productos.FindAsync(id);
            if (productoModels != null)
                _context.Productos.Remove(productoModels);

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProductoModelsExists(int id)
        {
            return _context.Productos.Any(e => e.ID == id);
        }
    }
}
