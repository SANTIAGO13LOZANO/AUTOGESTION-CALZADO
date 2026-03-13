import { useEffect, useState } from "react";
import api from "./api";

export default function App() {
  const [vista, setVista] = useState("dashboard");

  const [materiales, setMateriales] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);

  const [nuevoMaterial, setNuevoMaterial] = useState({
    nombre: "",
    unidad: "",
    stock: "",
    costoUnitario: "",
  });

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    nit: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    referencia: "",
    talla: "",
    color: "",
    precioSugerido: "",
  });

  const [productoMaterial, setProductoMaterial] = useState({
    productoId: "",
    materialId: "",
    cantidad: "",
  });

  const [costoProductoId, setCostoProductoId] = useState("");
  const [costoCalculado, setCostoCalculado] = useState(null);

  useEffect(() => {
    cargarMateriales();
    cargarProveedores();
    cargarProductos();
  }, []);

  async function cargarMateriales() {
    try {
      const res = await api.get("/materiales");
      setMateriales(res.data);
    } catch (error) {
      console.error("Error cargando materiales", error);
    }
  }

  async function cargarProveedores() {
    try {
      const res = await api.get("/proveedores");
      setProveedores(res.data);
    } catch (error) {
      console.error("Error cargando proveedores", error);
    }
  }

  async function cargarProductos() {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  }

  async function crearMaterial(e) {
    e.preventDefault();
    try {
      await api.post("/materiales", {
        ...nuevoMaterial,
        stock: Number(nuevoMaterial.stock),
        costoUnitario: Number(nuevoMaterial.costoUnitario),
      });
      setNuevoMaterial({
        nombre: "",
        unidad: "",
        stock: "",
        costoUnitario: "",
      });
      cargarMateriales();
      alert("Material creado");
    } catch (error) {
      console.error(error);
      alert("Error al crear material");
    }
  }

  async function crearProveedor(e) {
    e.preventDefault();
    try {
      await api.post("/proveedores", nuevoProveedor);
      setNuevoProveedor({
        nombre: "",
        nit: "",
        telefono: "",
        email: "",
        direccion: "",
      });
      cargarProveedores();
      alert("Proveedor creado");
    } catch (error) {
      console.error(error);
      alert("Error al crear proveedor");
    }
  }

  async function crearProducto(e) {
    e.preventDefault();
    try {
      await api.post("/productos", {
        ...nuevoProducto,
        precioSugerido: Number(nuevoProducto.precioSugerido),
      });
      setNuevoProducto({
        nombre: "",
        referencia: "",
        talla: "",
        color: "",
        precioSugerido: "",
      });
      cargarProductos();
      alert("Producto creado");
    } catch (error) {
      console.error(error);
      alert("Error al crear producto");
    }
  }

  async function asociarMaterialProducto(e) {
    e.preventDefault();
    try {
      await api.post(`/productos/${productoMaterial.productoId}/materiales`, [
        {
          materialId: Number(productoMaterial.materialId),
          cantidad: Number(productoMaterial.cantidad),
        },
      ]);
      setProductoMaterial({
        productoId: "",
        materialId: "",
        cantidad: "",
      });
      alert("Material asociado al producto");
    } catch (error) {
      console.error(error);
      alert("Error al asociar material");
    }
  }

  async function consultarCostoProducto(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/productos/${costoProductoId}/costo`);
      setCostoCalculado(res.data);
    } catch (error) {
      console.error(error);
      alert("Error al consultar costo");
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Calzado ERP</h2>
        <button onClick={() => setVista("dashboard")}>Dashboard</button>
        <button onClick={() => setVista("materiales")}>Materiales</button>
        <button onClick={() => setVista("proveedores")}>Proveedores</button>
        <button onClick={() => setVista("productos")}>Productos</button>
        <button onClick={() => setVista("costos")}>Costos</button>
      </aside>

      <main className="main">
        {vista === "dashboard" && (
          <section>
            <h1>Dashboard</h1>
            <div className="cards">
              <div className="card">
                <h3>Materiales</h3>
                <p>{materiales.length}</p>
              </div>
              <div className="card">
                <h3>Proveedores</h3>
                <p>{proveedores.length}</p>
              </div>
              <div className="card">
                <h3>Productos</h3>
                <p>{productos.length}</p>
              </div>
            </div>
          </section>
        )}

        {vista === "materiales" && (
          <section>
            <h1>Materiales</h1>

            <form className="form" onSubmit={crearMaterial}>
              <input
                placeholder="Nombre"
                value={nuevoMaterial.nombre}
                onChange={(e) =>
                  setNuevoMaterial({ ...nuevoMaterial, nombre: e.target.value })
                }
              />
              <input
                placeholder="Unidad"
                value={nuevoMaterial.unidad}
                onChange={(e) =>
                  setNuevoMaterial({ ...nuevoMaterial, unidad: e.target.value })
                }
              />
              <input
                placeholder="Stock"
                type="number"
                value={nuevoMaterial.stock}
                onChange={(e) =>
                  setNuevoMaterial({ ...nuevoMaterial, stock: e.target.value })
                }
              />
              <input
                placeholder="Costo unitario"
                type="number"
                value={nuevoMaterial.costoUnitario}
                onChange={(e) =>
                  setNuevoMaterial({
                    ...nuevoMaterial,
                    costoUnitario: e.target.value,
                  })
                }
              />
              <button type="submit">Guardar material</button>
            </form>

            <div className="list">
              {materiales.map((m) => (
                <div key={m.id} className="item">
                  <strong>{m.nombre}</strong> | {m.unidad} | stock: {m.stock} |
                  costo: {m.costoUnitario}
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "proveedores" && (
          <section>
            <h1>Proveedores</h1>

            <form className="form" onSubmit={crearProveedor}>
              <input
                placeholder="Nombre"
                value={nuevoProveedor.nombre}
                onChange={(e) =>
                  setNuevoProveedor({
                    ...nuevoProveedor,
                    nombre: e.target.value,
                  })
                }
              />
              <input
                placeholder="NIT"
                value={nuevoProveedor.nit}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, nit: e.target.value })
                }
              />
              <input
                placeholder="Teléfono"
                value={nuevoProveedor.telefono}
                onChange={(e) =>
                  setNuevoProveedor({
                    ...nuevoProveedor,
                    telefono: e.target.value,
                  })
                }
              />
              <input
                placeholder="Email"
                value={nuevoProveedor.email}
                onChange={(e) =>
                  setNuevoProveedor({
                    ...nuevoProveedor,
                    email: e.target.value,
                  })
                }
              />
              <input
                placeholder="Dirección"
                value={nuevoProveedor.direccion}
                onChange={(e) =>
                  setNuevoProveedor({
                    ...nuevoProveedor,
                    direccion: e.target.value,
                  })
                }
              />
              <button type="submit">Guardar proveedor</button>
            </form>

            <div className="list">
              {proveedores.map((p) => (
                <div key={p.id} className="item">
                  <strong>{p.nombre}</strong> | NIT: {p.nit} | {p.telefono}
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "productos" && (
          <section>
            <h1>Productos</h1>

            <form className="form" onSubmit={crearProducto}>
              <input
                placeholder="Nombre"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
              />
              <input
                placeholder="Referencia"
                value={nuevoProducto.referencia}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    referencia: e.target.value,
                  })
                }
              />
              <input
                placeholder="Talla"
                value={nuevoProducto.talla}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, talla: e.target.value })
                }
              />
              <input
                placeholder="Color"
                value={nuevoProducto.color}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, color: e.target.value })
                }
              />
              <input
                placeholder="Precio sugerido"
                type="number"
                value={nuevoProducto.precioSugerido}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    precioSugerido: e.target.value,
                  })
                }
              />
              <button type="submit">Guardar producto</button>
            </form>

            <h2>Asociar material a producto</h2>
            <form className="form" onSubmit={asociarMaterialProducto}>
              <input
                placeholder="Producto ID"
                type="number"
                value={productoMaterial.productoId}
                onChange={(e) =>
                  setProductoMaterial({
                    ...productoMaterial,
                    productoId: e.target.value,
                  })
                }
              />
              <input
                placeholder="Material ID"
                type="number"
                value={productoMaterial.materialId}
                onChange={(e) =>
                  setProductoMaterial({
                    ...productoMaterial,
                    materialId: e.target.value,
                  })
                }
              />
              <input
                placeholder="Cantidad"
                type="number"
                step="0.01"
                value={productoMaterial.cantidad}
                onChange={(e) =>
                  setProductoMaterial({
                    ...productoMaterial,
                    cantidad: e.target.value,
                  })
                }
              />
              <button type="submit">Asociar</button>
            </form>

            <div className="list">
              {productos.map((p) => (
                <div key={p.id} className="item">
                  <strong>{p.nombre}</strong> | ref: {p.referencia} | talla:{" "}
                  {p.talla} | color: {p.color}
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "costos" && (
          <section>
            <h1>Costos de producto</h1>

            <form className="form" onSubmit={consultarCostoProducto}>
              <input
                placeholder="Producto ID"
                type="number"
                value={costoProductoId}
                onChange={(e) => setCostoProductoId(e.target.value)}
              />
              <button type="submit">Consultar costo</button>
            </form>

            {costoCalculado && (
              <div className="card big">
                <h2>{costoCalculado.producto}</h2>
                <p>Referencia: {costoCalculado.referencia}</p>
                <p>
                  <strong>
                    Costo total materiales: {costoCalculado.costoTotalMateriales}
                  </strong>
                </p>

                <h3>Detalle</h3>
                {costoCalculado.detalles.map((d, i) => (
                  <div key={i} className="item">
                    {d.materialNombre} | cantidad: {d.cantidadProducto} | costo
                    unitario: {d.costoUnitarioMaterial} | subtotal: {d.subtotal}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}