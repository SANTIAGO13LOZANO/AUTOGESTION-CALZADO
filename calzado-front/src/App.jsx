import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [vista, setVista] = useState("dashboard");

  const [materiales, setMateriales] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [costoCalculado, setCostoCalculado] = useState(null);

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

  const [asociacion, setAsociacion] = useState({
    productoId: "",
    materialId: "",
    cantidad: "",
  });

  const [consultaCostoId, setConsultaCostoId] = useState("");

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    procesoPrincipal: "COMPRA",
    activo: true,
  });

  const [nuevaOrden, setNuevaOrden] = useState({
    productoId: "",
    cantidad: "",
    observaciones: "",
  });

  const [ordenConsultaId, setOrdenConsultaId] = useState("");

  useEffect(() => {
    cargarTodo();
  }, []);

  async function cargarTodo() {
    await Promise.all([
      cargarMateriales(),
      cargarProveedores(),
      cargarProductos(),
      cargarEmpleados(),
      cargarOrdenes(),
    ]);
  }

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

  async function cargarEmpleados() {
    try {
      const res = await api.get("/empleados");
      setEmpleados(res.data);
    } catch (error) {
      console.error("Error cargando empleados", error);
    }
  }

  async function cargarOrdenes() {
    try {
      const res = await api.get("/produccion/ordenes");
      setOrdenes(res.data);
    } catch (error) {
      console.error("Error cargando órdenes", error);
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

      await cargarMateriales();
      alert("Material creado correctamente");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al crear material");
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

      await cargarProveedores();
      alert("Proveedor creado correctamente");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al crear proveedor");
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

      await cargarProductos();
      alert("Producto creado correctamente");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al crear producto");
    }
  }

  async function asociarMaterialProducto(e) {
    e.preventDefault();
    try {
      await api.post(`/productos/${asociacion.productoId}/materiales`, [
        {
          materialId: Number(asociacion.materialId),
          cantidad: Number(asociacion.cantidad),
        },
      ]);

      setAsociacion({
        productoId: "",
        materialId: "",
        cantidad: "",
      });

      alert("Material asociado al producto");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al asociar material");
    }
  }

  async function consultarCostoProducto(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/productos/${consultaCostoId}/costo`);
      setCostoCalculado(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al consultar costo");
    }
  }

  async function crearEmpleado(e) {
    e.preventDefault();
    try {
      await api.post("/empleados", nuevoEmpleado);

      setNuevoEmpleado({
        nombre: "",
        procesoPrincipal: "COMPRA",
        activo: true,
      });

      await cargarEmpleados();
      alert("Empleado creado correctamente");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al crear empleado");
    }
  }

  async function crearOrden(e) {
    e.preventDefault();
    try {
      await api.post("/produccion/ordenes", {
        productoId: Number(nuevaOrden.productoId),
        cantidad: Number(nuevaOrden.cantidad),
        observaciones: nuevaOrden.observaciones,
      });

      setNuevaOrden({
        productoId: "",
        cantidad: "",
        observaciones: "",
      });

      await cargarOrdenes();
      alert("Orden creada correctamente");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al crear orden");
    }
  }

  async function consultarProcesosOrden(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/produccion/ordenes/${ordenConsultaId}/procesos`);
      setProcesos(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al consultar procesos");
    }
  }

  async function actualizarProceso(id, estado) {
    try {
      await api.put(`/produccion/procesos/${id}`, {
        estado,
        observaciones: `Actualizado a ${estado} desde interfaz`,
      });

      if (ordenConsultaId) {
        const res = await api.get(`/produccion/ordenes/${ordenConsultaId}/procesos`);
        setProcesos(res.data);
      }

      await cargarOrdenes();
      alert("Proceso actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "No se puede avanzar el proceso");
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Calzado ERP</h1>
        <button onClick={() => setVista("dashboard")}>Dashboard</button>
        <button onClick={() => setVista("materiales")}>Materiales</button>
        <button onClick={() => setVista("proveedores")}>Proveedores</button>
        <button onClick={() => setVista("productos")}>Productos</button>
        <button onClick={() => setVista("costos")}>Costos</button>
        <button onClick={() => setVista("empleados")}>Empleados</button>
        <button onClick={() => setVista("produccion")}>Producción</button>
      </aside>

      <main className="main">
        {vista === "dashboard" && (
          <section className="panel">
            <h2>Panel general</h2>
            <p className="subtitulo">Resumen del sistema</p>

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

              <div className="card">
                <h3>Empleados</h3>
                <p>{empleados.length}</p>
              </div>

              <div className="card">
                <h3>Órdenes</h3>
                <p>{ordenes.length}</p>
              </div>
            </div>
          </section>
        )}

        {vista === "materiales" && (
          <section className="panel">
            <h2>Materiales</h2>
            <p className="subtitulo">Registro simple de materiales</p>

            <form className="form-grid" onSubmit={crearMaterial}>
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

            <div className="lista">
              {materiales.map((m) => (
                <div className="item" key={m.id}>
                  <strong>{m.nombre}</strong>
                  <span>Unidad: {m.unidad}</span>
                  <span>Stock: {m.stock}</span>
                  <span>Costo: {m.costoUnitario}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "proveedores" && (
          <section className="panel">
            <h2>Proveedores</h2>
            <p className="subtitulo">Registro de proveedores</p>

            <form className="form-grid" onSubmit={crearProveedor}>
              <input
                placeholder="Nombre"
                value={nuevoProveedor.nombre}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })
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
                  setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })
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

            <div className="lista">
              {proveedores.map((p) => (
                <div className="item" key={p.id}>
                  <strong>{p.nombre}</strong>
                  <span>NIT: {p.nit}</span>
                  <span>Teléfono: {p.telefono}</span>
                  <span>Email: {p.email}</span>
                  <span>Dirección: {p.direccion}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "productos" && (
          <section className="panel">
            <h2>Productos</h2>
            <p className="subtitulo">Registro de productos y asociación de materiales</p>

            <form className="form-grid" onSubmit={crearProducto}>
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

            <h3 className="seccion-titulo">Asociar material a producto</h3>

            <form className="form-grid" onSubmit={asociarMaterialProducto}>
              <input
                placeholder="Producto ID"
                type="number"
                value={asociacion.productoId}
                onChange={(e) =>
                  setAsociacion({ ...asociacion, productoId: e.target.value })
                }
              />
              <input
                placeholder="Material ID"
                type="number"
                value={asociacion.materialId}
                onChange={(e) =>
                  setAsociacion({ ...asociacion, materialId: e.target.value })
                }
              />
              <input
                placeholder="Cantidad"
                type="number"
                step="0.01"
                value={asociacion.cantidad}
                onChange={(e) =>
                  setAsociacion({ ...asociacion, cantidad: e.target.value })
                }
              />
              <button type="submit">Guardar asociación</button>
            </form>

            <div className="lista">
              {productos.map((p) => (
                <div className="item" key={p.id}>
                  <strong>{p.nombre}</strong>
                  <span>Referencia: {p.referencia}</span>
                  <span>Talla: {p.talla}</span>
                  <span>Color: {p.color}</span>
                  <span>Precio sugerido: {p.precioSugerido}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "costos" && (
          <section className="panel">
            <h2>Costos de producto</h2>
            <p className="subtitulo">Consulta simple del costo por materiales</p>

            <form className="form-grid" onSubmit={consultarCostoProducto}>
              <input
                placeholder="Producto ID"
                type="number"
                value={consultaCostoId}
                onChange={(e) => setConsultaCostoId(e.target.value)}
              />
              <button type="submit">Consultar costo</button>
            </form>

            {costoCalculado && (
              <div className="resultado-costo">
                <h3>{costoCalculado.producto}</h3>
                <p>Referencia: {costoCalculado.referencia}</p>
                <p>
                  <strong>Costo total materiales: {costoCalculado.costoTotalMateriales}</strong>
                </p>

                <div className="lista">
                  {costoCalculado.detalles.map((d, i) => (
                    <div className="item" key={i}>
                      <strong>{d.materialNombre}</strong>
                      <span>Cantidad: {d.cantidadProducto}</span>
                      <span>Costo unitario: {d.costoUnitarioMaterial}</span>
                      <span>Subtotal: {d.subtotal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {vista === "empleados" && (
          <section className="panel">
            <h2>Empleados</h2>
            <p className="subtitulo">Registro de responsables por proceso</p>

            <form className="form-grid" onSubmit={crearEmpleado}>
              <input
                placeholder="Nombre"
                value={nuevoEmpleado.nombre}
                onChange={(e) =>
                  setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })
                }
              />

              <select
                value={nuevoEmpleado.procesoPrincipal}
                onChange={(e) =>
                  setNuevoEmpleado({
                    ...nuevoEmpleado,
                    procesoPrincipal: e.target.value,
                  })
                }
              >
                <option value="COMPRA">COMPRA</option>
                <option value="CORTE">CORTE</option>
                <option value="GUARNECIDA">GUARNECIDA</option>
                <option value="SOLADURA">SOLADURA</option>
                <option value="COSIDA">COSIDA</option>
                <option value="EMPLANTILLADA">EMPLANTILLADA</option>
                <option value="EMPAQUE">EMPAQUE</option>
              </select>

              <button type="submit">Guardar empleado</button>
            </form>

            <div className="lista">
              {empleados.map((e) => (
                <div className="item" key={e.id}>
                  <strong>{e.nombre}</strong>
                  <span>Proceso: {e.procesoPrincipal}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "produccion" && (
          <section className="panel">
            <h2>Producción</h2>
            <p className="subtitulo">Creación de orden y seguimiento de procesos</p>

            <h3 className="seccion-titulo">Nueva orden</h3>
            <form className="form-grid" onSubmit={crearOrden}>
              <input
                placeholder="Producto ID"
                type="number"
                value={nuevaOrden.productoId}
                onChange={(e) =>
                  setNuevaOrden({ ...nuevaOrden, productoId: e.target.value })
                }
              />
              <input
                placeholder="Cantidad"
                type="number"
                value={nuevaOrden.cantidad}
                onChange={(e) =>
                  setNuevaOrden({ ...nuevaOrden, cantidad: e.target.value })
                }
              />
              <input
                placeholder="Observaciones"
                value={nuevaOrden.observaciones}
                onChange={(e) =>
                  setNuevaOrden({
                    ...nuevaOrden,
                    observaciones: e.target.value,
                  })
                }
              />
              <button type="submit">Crear orden</button>
            </form>

            <h3 className="seccion-titulo">Consultar procesos de una orden</h3>
            <form className="form-grid" onSubmit={consultarProcesosOrden}>
              <input
                placeholder="ID orden"
                type="number"
                value={ordenConsultaId}
                onChange={(e) => setOrdenConsultaId(e.target.value)}
              />
              <button type="submit">Ver procesos</button>
            </form>

            <div className="lista">
              {procesos.map((p) => (
                <div className="item" key={p.id}>
                  <strong>{p.tipoProceso}</strong>
                  <span>Estado: {p.estado}</span>
                  <span>Empleado ID: {p.empleadoId ?? "No asignado"}</span>

                  <div className="acciones-proceso">
                    <button onClick={() => actualizarProceso(p.id, "EN_PROCESO")}>
                      Iniciar
                    </button>
                    <button onClick={() => actualizarProceso(p.id, "TERMINADO")}>
                      Terminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="seccion-titulo">Órdenes registradas</h3>
            <div className="lista">
              {ordenes.map((o) => (
                <div className="item" key={o.id}>
                  <strong>Orden #{o.id}</strong>
                  <span>Producto ID: {o.productoId}</span>
                  <span>Cantidad: {o.cantidad}</span>
                  <span>Estado: {o.estado}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;