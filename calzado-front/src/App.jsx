import { useEffect, useMemo, useState } from "react";
import api from "./api";

function App() {
  const [vista, setVista] = useState("inicio");

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

  const [consultaCostoProductoId, setConsultaCostoProductoId] = useState("");

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
      const res = await api.get(`/productos/${consultaCostoProductoId}/costo`);
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

  const mapaProductos = useMemo(() => {
    const map = {};
    productos.forEach((p) => {
      map[p.id] = `${p.nombre}${p.referencia ? ` - ${p.referencia}` : ""}`;
    });
    return map;
  }, [productos]);

  const mapaEmpleados = useMemo(() => {
    const map = {};
    empleados.forEach((e) => {
      map[e.id] = e.nombre;
    });
    return map;
  }, [empleados]);

  function TarjetaInicio({ titulo, subtitulo, onClick }) {
    return (
      <button className="shortcut-card" onClick={onClick}>
        <span className="shortcut-title">{titulo}</span>
        <span className="shortcut-subtitle">{subtitulo}</span>
      </button>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-badge">NS</div>
          <div>
            <h1>CALZADO NORT SPORT</h1>
            <p>Sistema de gestión</p>
          </div>
        </div>

        <nav className="nav">
          <button className={vista === "inicio" ? "active" : ""} onClick={() => setVista("inicio")}>
            Inicio
          </button>
          <button className={vista === "materiales" ? "active" : ""} onClick={() => setVista("materiales")}>
            Materiales
          </button>
          <button className={vista === "proveedores" ? "active" : ""} onClick={() => setVista("proveedores")}>
            Proveedores
          </button>
          <button className={vista === "productos" ? "active" : ""} onClick={() => setVista("productos")}>
            Productos
          </button>
          <button className={vista === "costos" ? "active" : ""} onClick={() => setVista("costos")}>
            Costos
          </button>
          <button className={vista === "empleados" ? "active" : ""} onClick={() => setVista("empleados")}>
            Empleados
          </button>
          <button className={vista === "produccion" ? "active" : ""} onClick={() => setVista("produccion")}>
            Producción
          </button>
        </nav>
      </aside>

      <main className="content">
        {vista === "inicio" && (
          <section className="panel">
            <div className="hero">
              <div>
                <h2>Inicio</h2>
                <p className="subtitulo">
                  Seleccione una opción para trabajar en el sistema.
                </p>
              </div>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-label">Materiales</span>
                <strong>{materiales.length}</strong>
              </div>
              <div className="summary-card">
                <span className="summary-label">Proveedores</span>
                <strong>{proveedores.length}</strong>
              </div>
              <div className="summary-card">
                <span className="summary-label">Productos</span>
                <strong>{productos.length}</strong>
              </div>
              <div className="summary-card">
                <span className="summary-label">Empleados</span>
                <strong>{empleados.length}</strong>
              </div>
              <div className="summary-card">
                <span className="summary-label">Órdenes</span>
                <strong>{ordenes.length}</strong>
              </div>
            </div>

            <div className="shortcut-grid">
              <TarjetaInicio
                titulo="Materiales"
                subtitulo="Registrar y consultar insumos"
                onClick={() => setVista("materiales")}
              />
              <TarjetaInicio
                titulo="Proveedores"
                subtitulo="Registrar datos de proveedores"
                onClick={() => setVista("proveedores")}
              />
              <TarjetaInicio
                titulo="Productos"
                subtitulo="Crear productos y asociar materiales"
                onClick={() => setVista("productos")}
              />
              <TarjetaInicio
                titulo="Costos"
                subtitulo="Consultar costo por producto"
                onClick={() => setVista("costos")}
              />
              <TarjetaInicio
                titulo="Empleados"
                subtitulo="Registrar responsables por proceso"
                onClick={() => setVista("empleados")}
              />
              <TarjetaInicio
                titulo="Producción"
                subtitulo="Crear órdenes y revisar etapas"
                onClick={() => setVista("produccion")}
              />
            </div>
          </section>
        )}

        {vista === "materiales" && (
          <section className="panel">
            <h2>Materiales</h2>
            <p className="subtitulo">Registro y consulta de insumos</p>

            <form className="modern-form" onSubmit={crearMaterial}>
              <input
                placeholder="Nombre del material"
                value={nuevoMaterial.nombre}
                onChange={(e) =>
                  setNuevoMaterial({ ...nuevoMaterial, nombre: e.target.value })
                }
              />
              <input
                placeholder="Unidad de medida"
                value={nuevoMaterial.unidad}
                onChange={(e) =>
                  setNuevoMaterial({ ...nuevoMaterial, unidad: e.target.value })
                }
              />
              <input
                placeholder="Stock inicial"
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

            <div className="list-grid">
              {materiales.map((m) => (
                <div className="info-card" key={m.id}>
                  <strong>{m.nombre}</strong>
                  <span>Unidad: {m.unidad}</span>
                  <span>Stock: {m.stock}</span>
                  <span>Costo unitario: {m.costoUnitario}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "proveedores" && (
          <section className="panel">
            <h2>Proveedores</h2>
            <p className="subtitulo">Registro de datos de proveedores</p>

            <form className="modern-form" onSubmit={crearProveedor}>
              <input
                placeholder="Nombre del proveedor"
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
                placeholder="Correo electrónico"
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

            <div className="list-grid">
              {proveedores.map((p) => (
                <div className="info-card" key={p.id}>
                  <strong>{p.nombre}</strong>
                  <span>NIT: {p.nit}</span>
                  <span>Teléfono: {p.telefono}</span>
                  <span>Correo: {p.email}</span>
                  <span>Dirección: {p.direccion}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "productos" && (
          <section className="panel">
            <h2>Productos</h2>
            <p className="subtitulo">Registro de productos y materiales asociados</p>

            <form className="modern-form" onSubmit={crearProducto}>
              <input
                placeholder="Nombre del producto"
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

            <h3 className="section-title">Asociar material a producto</h3>

            <form className="modern-form" onSubmit={asociarMaterialProducto}>
              <select
                value={asociacion.productoId}
                onChange={(e) =>
                  setAsociacion({ ...asociacion, productoId: e.target.value })
                }
              >
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.referencia ? `- ${p.referencia}` : ""}
                  </option>
                ))}
              </select>

              <select
                value={asociacion.materialId}
                onChange={(e) =>
                  setAsociacion({ ...asociacion, materialId: e.target.value })
                }
              >
                <option value="">Seleccione un material</option>
                {materiales.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>

              <input
                placeholder="Cantidad requerida"
                type="number"
                step="0.01"
                value={asociacion.cantidad}
                onChange={(e) =>
                  setAsociacion({ ...asociacion, cantidad: e.target.value })
                }
              />
              <button type="submit">Guardar asociación</button>
            </form>

            <div className="list-grid">
              {productos.map((p) => (
                <div className="info-card" key={p.id}>
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
            <h2>Costos</h2>
            <p className="subtitulo">Consulta del costo del producto</p>

            <form className="modern-form" onSubmit={consultarCostoProducto}>
              <select
                value={consultaCostoProductoId}
                onChange={(e) => setConsultaCostoProductoId(e.target.value)}
              >
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.referencia ? `- ${p.referencia}` : ""}
                  </option>
                ))}
              </select>

              <button type="submit">Consultar costo</button>
            </form>

            {costoCalculado && (
              <div className="cost-box">
                <h3>{costoCalculado.producto}</h3>
                <p>Referencia: {costoCalculado.referencia}</p>
                <p className="highlight">
                  Costo total materiales: {costoCalculado.costoTotalMateriales}
                </p>

                <div className="list-grid">
                  {costoCalculado.detalles.map((d, i) => (
                    <div className="info-card" key={i}>
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

            <form className="modern-form" onSubmit={crearEmpleado}>
              <input
                placeholder="Nombre del empleado"
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
                <option value="COMPRA">Compra</option>
                <option value="CORTE">Corte</option>
                <option value="GUARNECIDA">Guarnecida</option>
                <option value="SOLADURA">Soladura</option>
                <option value="COSIDA">Cosida</option>
                <option value="EMPLANTILLADA">Emplantillada</option>
                <option value="EMPAQUE">Empaque</option>
              </select>

              <button type="submit">Guardar empleado</button>
            </form>

            <div className="list-grid">
              {empleados.map((e) => (
                <div className="info-card" key={e.id}>
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
            <p className="subtitulo">Creación de órdenes y seguimiento del proceso</p>

            <h3 className="section-title">Nueva orden</h3>

            <form className="modern-form" onSubmit={crearOrden}>
              <select
                value={nuevaOrden.productoId}
                onChange={(e) =>
                  setNuevaOrden({ ...nuevaOrden, productoId: e.target.value })
                }
              >
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.referencia ? `- ${p.referencia}` : ""}
                  </option>
                ))}
              </select>

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

            <h3 className="section-title">Consultar procesos de una orden</h3>

            <form className="modern-form" onSubmit={consultarProcesosOrden}>
              <select
                value={ordenConsultaId}
                onChange={(e) => setOrdenConsultaId(e.target.value)}
              >
                <option value="">Seleccione una orden</option>
                {ordenes.map((o) => (
                  <option key={o.id} value={o.id}>
                    Orden #{o.id} - {mapaProductos[o.productoId] || `Producto ${o.productoId}`}
                  </option>
                ))}
              </select>

              <button type="submit">Ver procesos</button>
            </form>

            <div className="list-grid">
              {procesos.map((p) => (
                <div className="info-card" key={p.id}>
                  <strong>{p.tipoProceso}</strong>
                  <span>Estado: {p.estado}</span>
                  <span>
                    Responsable: {mapaEmpleados[p.empleadoId] || "Sin asignar"}
                  </span>

                  <div className="action-row">
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

            <h3 className="section-title">Órdenes registradas</h3>

            <div className="list-grid">
              {ordenes.map((o) => (
                <div className="info-card" key={o.id}>
                  <strong>Orden #{o.id}</strong>
                  <span>Producto: {mapaProductos[o.productoId] || o.productoId}</span>
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