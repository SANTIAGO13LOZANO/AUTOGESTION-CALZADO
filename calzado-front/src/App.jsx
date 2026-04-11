import { useEffect, useMemo, useState } from "react";
import api from "./api";
import "./App.css";

function App() {
  const [vista, setVista] = useState("inicio");

  const [materiales, setMateriales] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [costoCalculado, setCostoCalculado] = useState(null);

  const [tarifas, setTarifas] = useState([]);
  const [trabajos, setTrabajos] = useState([]);
  const [resumenEmpleado, setResumenEmpleado] = useState(null);
  const [costoManoObraOrden, setCostoManoObraOrden] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [detallesPedidoConsultado, setDetallesPedidoConsultado] = useState([]);
  const [despachoConsultado, setDespachoConsultado] = useState(null);

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

  const [nuevaTarifa, setNuevaTarifa] = useState({
    tipoProceso: "COMPRA",
    valorUnidad: "",
  });

  const [nuevoTrabajo, setNuevoTrabajo] = useState({
    empleadoId: "",
    ordenProduccionId: "",
    unidadesTrabajadas: "",
    observaciones: "",
  });

  const [resumenEmpleadoId, setResumenEmpleadoId] = useState("");
  const [manoObraOrdenId, setManoObraOrdenId] = useState("");

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    identificacion: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [nuevoPedido, setNuevoPedido] = useState({
    clienteId: "",
    observaciones: "",
  });

  const [detallePedido, setDetallePedido] = useState({
    productoId: "",
    cantidad: "",
    talla: "",
    observaciones: "",
  });

  const [detallesPedido, setDetallesPedido] = useState([]);

  const [pedidoConsultaId, setPedidoConsultaId] = useState("");
  const [pedidoEstadoId, setPedidoEstadoId] = useState("");
  const [nuevoEstadoPedido, setNuevoEstadoPedido] = useState("EN_PRODUCCION");

  const [nuevoDespacho, setNuevoDespacho] = useState({
    pedidoId: "",
    transporte: "",
    destinatario: "",
    responsable: "",
    observaciones: "",
  });

  const [pedidoDespachoConsultaId, setPedidoDespachoConsultaId] = useState("");

  useEffect(() => {
    cargarTodo();
  }, []);

  async function cargarTodo() {
    await Promise.allSettled([
      cargarMateriales(),
      cargarProveedores(),
      cargarProductos(),
      cargarEmpleados(),
      cargarOrdenes(),
      cargarTarifas(),
      cargarTrabajos(),
      cargarClientes(),
      cargarPedidos(),
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

  async function cargarTarifas() {
    try {
      const res = await api.get("/nomina/tarifas");
      setTarifas(res.data);
    } catch (error) {
      console.error("Error cargando tarifas", error);
      setTarifas([]);
    }
  }

  async function cargarTrabajos() {
    try {
      const res = await api.get("/nomina/trabajos");
      setTrabajos(res.data);
    } catch (error) {
      console.error("Error cargando trabajos", error);
      setTrabajos([]);
    }
  }

  async function cargarClientes() {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (error) {
      console.error("Error cargando clientes", error);
      setClientes([]);
    }
  }

  async function cargarPedidos() {
    try {
      const res = await api.get("/pedidos");
      setPedidos(res.data);
    } catch (error) {
      console.error("Error cargando pedidos", error);
      setPedidos([]);
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
      setNuevoMaterial({ nombre: "", unidad: "", stock: "", costoUnitario: "" });
      await cargarMateriales();
      alert("Material creado correctamente");
    } catch (error) {
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
      setAsociacion({ productoId: "", materialId: "", cantidad: "" });
      alert("Material asociado al producto");
    } catch (error) {
      alert(error.response?.data?.message || "Error al asociar material");
    }
  }

  async function consultarCostoProducto(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/productos/${consultaCostoProductoId}/costo`);
      setCostoCalculado(res.data);
    } catch (error) {
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
      setNuevaOrden({ productoId: "", cantidad: "", observaciones: "" });
      await cargarOrdenes();
      alert("Orden creada correctamente");
    } catch (error) {
      alert(error.response?.data?.message || "Error al crear orden");
    }
  }

  async function consultarProcesosOrden(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/produccion/ordenes/${ordenConsultaId}/procesos`);
      setProcesos(res.data);
    } catch (error) {
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
      alert(error.response?.data?.message || "No se puede avanzar el proceso");
    }
  }

  async function guardarTarifa(e) {
    e.preventDefault();
    try {
      await api.post("/nomina/tarifas", {
        tipoProceso: nuevaTarifa.tipoProceso,
        valorUnidad: Number(nuevaTarifa.valorUnidad),
      });
      setNuevaTarifa({ tipoProceso: "COMPRA", valorUnidad: "" });
      await cargarTarifas();
      alert("Tarifa guardada correctamente");
    } catch (error) {
      alert(error.response?.data?.message || "Error al guardar tarifa");
    }
  }

  const empleadoSeleccionadoNomina = useMemo(() => {
    return empleados.find((e) => String(e.id) === String(nuevoTrabajo.empleadoId)) || null;
  }, [empleados, nuevoTrabajo.empleadoId]);

  async function registrarTrabajoNomina(e) {
    e.preventDefault();
    if (!empleadoSeleccionadoNomina) {
      alert("Seleccione un empleado");
      return;
    }

    try {
      await api.post("/nomina/trabajos", {
        empleadoId: Number(nuevoTrabajo.empleadoId),
        ordenProduccionId: Number(nuevoTrabajo.ordenProduccionId),
        tipoProceso: empleadoSeleccionadoNomina.procesoPrincipal,
        unidadesTrabajadas: Number(nuevoTrabajo.unidadesTrabajadas),
        observaciones: nuevoTrabajo.observaciones,
      });

      setNuevoTrabajo({
        empleadoId: "",
        ordenProduccionId: "",
        unidadesTrabajadas: "",
        observaciones: "",
      });

      await cargarTrabajos();
      alert("Trabajo registrado correctamente");
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrar trabajo");
    }
  }

  async function consultarResumenEmpleado(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/nomina/empleados/${resumenEmpleadoId}/resumen`);
      setResumenEmpleado(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error al consultar resumen");
    }
  }

  async function consultarCostoManoObra(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/nomina/ordenes/${manoObraOrdenId}/mano-obra`);
      setCostoManoObraOrden(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error al consultar mano de obra");
    }
  }

  async function crearCliente(e) {
    e.preventDefault();
    try {
      await api.post("/clientes", nuevoCliente);
      setNuevoCliente({
        nombre: "",
        identificacion: "",
        telefono: "",
        email: "",
        direccion: "",
      });
      await cargarClientes();
      alert("Cliente creado correctamente");
    } catch (error) {
      alert(error.response?.data?.message || "Error al crear cliente");
    }
  }

  function agregarDetallePedido(e) {
    e.preventDefault();

    if (!detallePedido.productoId || !detallePedido.cantidad) {
      alert("Seleccione producto y cantidad");
      return;
    }

    setDetallesPedido((prev) => [
      ...prev,
      {
        productoId: Number(detallePedido.productoId),
        cantidad: Number(detallePedido.cantidad),
        talla: detallePedido.talla,
        observaciones: detallePedido.observaciones,
      },
    ]);

    setDetallePedido({
      productoId: "",
      cantidad: "",
      talla: "",
      observaciones: "",
    });
  }

  function eliminarDetallePedido(index) {
    setDetallesPedido((prev) => prev.filter((_, i) => i !== index));
  }

  async function crearPedido(e) {
    e.preventDefault();

    if (!nuevoPedido.clienteId) {
      alert("Seleccione un cliente");
      return;
    }

    if (detallesPedido.length === 0) {
      alert("Agregue al menos un producto al pedido");
      return;
    }

    try {
      await api.post("/pedidos", {
        clienteId: Number(nuevoPedido.clienteId),
        observaciones: nuevoPedido.observaciones,
        detalles: detallesPedido,
      });

      setNuevoPedido({
        clienteId: "",
        observaciones: "",
      });
      setDetallesPedido([]);
      await cargarPedidos();
      alert("Pedido creado correctamente");
    } catch (error) {
      alert(error.response?.data?.message || "Error al crear pedido");
    }
  }

  async function consultarDetallesPedido(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/pedidos/${pedidoConsultaId}/detalles`);
      setDetallesPedidoConsultado(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error al consultar detalles");
    }
  }

  async function actualizarEstadoPedido(e) {
    e.preventDefault();
    try {
      await api.put(`/pedidos/${pedidoEstadoId}/estado?estado=${nuevoEstadoPedido}`);
      await cargarPedidos();
      alert("Estado de pedido actualizado");
    } catch (error) {
      alert(error.response?.data?.message || "Error al actualizar estado");
    }
  }

  async function registrarDespacho(e) {
    e.preventDefault();
    try {
      await api.post("/despachos", {
        pedidoId: Number(nuevoDespacho.pedidoId),
        transporte: nuevoDespacho.transporte,
        destinatario: nuevoDespacho.destinatario,
        responsable: nuevoDespacho.responsable,
        observaciones: nuevoDespacho.observaciones,
      });

      setNuevoDespacho({
        pedidoId: "",
        transporte: "",
        destinatario: "",
        responsable: "",
        observaciones: "",
      });

      await cargarPedidos();
      alert("Despacho registrado correctamente");
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrar despacho");
    }
  }

  async function consultarDespachoPedido(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/despachos/pedido/${pedidoDespachoConsultaId}`);
      setDespachoConsultado(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error al consultar despacho");
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

  const mapaClientes = useMemo(() => {
    const map = {};
    clientes.forEach((c) => {
      map[c.id] = c.nombre;
    });
    return map;
  }, [clientes]);

  function TarjetaInicio({ titulo, subtitulo, dato, onClick }) {
    return (
      <button className="shortcut-card" onClick={onClick}>
        <div className="shortcut-top">
          <span className="shortcut-title">{titulo}</span>
          <span className="shortcut-badge">{dato}</span>
        </div>
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
          <button className={vista === "inicio" ? "active" : ""} onClick={() => setVista("inicio")}>Inicio</button>
          <button className={vista === "materiales" ? "active" : ""} onClick={() => setVista("materiales")}>Materiales</button>
          <button className={vista === "proveedores" ? "active" : ""} onClick={() => setVista("proveedores")}>Proveedores</button>
          <button className={vista === "productos" ? "active" : ""} onClick={() => setVista("productos")}>Productos</button>
          <button className={vista === "costos" ? "active" : ""} onClick={() => setVista("costos")}>Costos</button>
          <button className={vista === "empleados" ? "active" : ""} onClick={() => setVista("empleados")}>Empleados</button>
          <button className={vista === "produccion" ? "active" : ""} onClick={() => setVista("produccion")}>Producción</button>
          <button className={vista === "nomina" ? "active" : ""} onClick={() => setVista("nomina")}>Nómina</button>
          <button className={vista === "clientes" ? "active" : ""} onClick={() => setVista("clientes")}>Clientes</button>
          <button className={vista === "pedidos" ? "active" : ""} onClick={() => setVista("pedidos")}>Pedidos</button>
          <button className={vista === "despachos" ? "active" : ""} onClick={() => setVista("despachos")}>Despachos</button>
        </nav>
      </aside>

      <main className="content">
        {vista === "inicio" && (
          <section className="panel">
            <div className="hero">
              <div>
                <h2>Inicio</h2>
                <p className="subtitulo">Seleccione una opción para trabajar en el sistema.</p>
              </div>
            </div>

            <div className="shortcut-grid">
              <TarjetaInicio titulo="Materiales" subtitulo="Registrar y consultar insumos" dato={materiales.length} onClick={() => setVista("materiales")} />
              <TarjetaInicio titulo="Proveedores" subtitulo="Registrar datos de proveedores" dato={proveedores.length} onClick={() => setVista("proveedores")} />
              <TarjetaInicio titulo="Productos" subtitulo="Crear productos y asociar materiales" dato={productos.length} onClick={() => setVista("productos")} />
              <TarjetaInicio titulo="Costos" subtitulo="Consultar costo por producto" dato="$$" onClick={() => setVista("costos")} />
              <TarjetaInicio titulo="Empleados" subtitulo="Registrar responsables por proceso" dato={empleados.length} onClick={() => setVista("empleados")} />
              <TarjetaInicio titulo="Producción" subtitulo="Crear órdenes y revisar etapas" dato={ordenes.length} onClick={() => setVista("produccion")} />
              <TarjetaInicio titulo="Nómina" subtitulo="Tarifas, trabajos y pagos" dato={trabajos.length} onClick={() => setVista("nomina")} />
              <TarjetaInicio titulo="Clientes" subtitulo="Registrar clientes comerciales" dato={clientes.length} onClick={() => setVista("clientes")} />
              <TarjetaInicio titulo="Pedidos" subtitulo="Crear pedidos y sus detalles" dato={pedidos.length} onClick={() => setVista("pedidos")} />
              <TarjetaInicio titulo="Despachos" subtitulo="Despachar pedidos listos" dato={despachoConsultado ? 1 : 0} onClick={() => setVista("despachos")} />
            </div>
          </section>
        )}

        {vista === "materiales" && (
          <section className="panel">
            <h2>Materiales</h2>
            <p className="subtitulo">Registro y consulta de insumos</p>
            <form className="modern-form" onSubmit={crearMaterial}>
              <input placeholder="Nombre del material" value={nuevoMaterial.nombre} onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, nombre: e.target.value })} />
              <input placeholder="Unidad de medida" value={nuevoMaterial.unidad} onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, unidad: e.target.value })} />
              <input placeholder="Stock inicial" type="number" value={nuevoMaterial.stock} onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, stock: e.target.value })} />
              <input placeholder="Costo unitario" type="number" value={nuevoMaterial.costoUnitario} onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, costoUnitario: e.target.value })} />
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
              <input placeholder="Nombre del proveedor" value={nuevoProveedor.nombre} onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })} />
              <input placeholder="NIT" value={nuevoProveedor.nit} onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nit: e.target.value })} />
              <input placeholder="Teléfono" value={nuevoProveedor.telefono} onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono: e.target.value })} />
              <input placeholder="Correo electrónico" value={nuevoProveedor.email} onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })} />
              <input placeholder="Dirección" value={nuevoProveedor.direccion} onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, direccion: e.target.value })} />
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
              <input placeholder="Nombre del producto" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} />
              <input placeholder="Referencia" value={nuevoProducto.referencia} onChange={(e) => setNuevoProducto({ ...nuevoProducto, referencia: e.target.value })} />
              <input placeholder="Talla" value={nuevoProducto.talla} onChange={(e) => setNuevoProducto({ ...nuevoProducto, talla: e.target.value })} />
              <input placeholder="Color" value={nuevoProducto.color} onChange={(e) => setNuevoProducto({ ...nuevoProducto, color: e.target.value })} />
              <input placeholder="Precio sugerido" type="number" value={nuevoProducto.precioSugerido} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precioSugerido: e.target.value })} />
              <button type="submit">Guardar producto</button>
            </form>

            <h3 className="section-title">Asociar material a producto</h3>

            <form className="modern-form" onSubmit={asociarMaterialProducto}>
              <select value={asociacion.productoId} onChange={(e) => setAsociacion({ ...asociacion, productoId: e.target.value })}>
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.referencia ? `- ${p.referencia}` : ""}
                  </option>
                ))}
              </select>

              <select value={asociacion.materialId} onChange={(e) => setAsociacion({ ...asociacion, materialId: e.target.value })}>
                <option value="">Seleccione un material</option>
                {materiales.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </select>

              <input placeholder="Cantidad requerida" type="number" step="0.01" value={asociacion.cantidad} onChange={(e) => setAsociacion({ ...asociacion, cantidad: e.target.value })} />
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
              <select value={consultaCostoProductoId} onChange={(e) => setConsultaCostoProductoId(e.target.value)}>
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
                <p className="highlight">Costo total materiales: {costoCalculado.costoTotalMateriales}</p>

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
              <input placeholder="Nombre del empleado" value={nuevoEmpleado.nombre} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })} />

              <select value={nuevoEmpleado.procesoPrincipal} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, procesoPrincipal: e.target.value })}>
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
              <select value={nuevaOrden.productoId} onChange={(e) => setNuevaOrden({ ...nuevaOrden, productoId: e.target.value })}>
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.referencia ? `- ${p.referencia}` : ""}
                  </option>
                ))}
              </select>

              <input placeholder="Cantidad" type="number" value={nuevaOrden.cantidad} onChange={(e) => setNuevaOrden({ ...nuevaOrden, cantidad: e.target.value })} />
              <input placeholder="Observaciones" value={nuevaOrden.observaciones} onChange={(e) => setNuevaOrden({ ...nuevaOrden, observaciones: e.target.value })} />
              <button type="submit">Crear orden</button>
            </form>

            <h3 className="section-title">Consultar procesos de una orden</h3>

            <form className="modern-form" onSubmit={consultarProcesosOrden}>
              <select value={ordenConsultaId} onChange={(e) => setOrdenConsultaId(e.target.value)}>
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
                  <span>Responsable: {mapaEmpleados[p.empleadoId] || "Sin asignar"}</span>

                  <div className="action-row">
                    <button type="button" onClick={() => actualizarProceso(p.id, "EN_PROCESO")}>Iniciar</button>
                    <button type="button" onClick={() => actualizarProceso(p.id, "TERMINADO")}>Terminar</button>
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

        {vista === "nomina" && (
          <section className="panel">
            <h2>Nómina</h2>
            <p className="subtitulo">Pago de operarios por producción</p>

            <h3 className="section-title">Tarifas por proceso</h3>
            <form className="modern-form" onSubmit={guardarTarifa}>
              <select value={nuevaTarifa.tipoProceso} onChange={(e) => setNuevaTarifa({ ...nuevaTarifa, tipoProceso: e.target.value })}>
                <option value="COMPRA">Compra</option>
                <option value="CORTE">Corte</option>
                <option value="GUARNECIDA">Guarnecida</option>
                <option value="SOLADURA">Soladura</option>
                <option value="COSIDA">Cosida</option>
                <option value="EMPLANTILLADA">Emplantillada</option>
                <option value="EMPAQUE">Empaque</option>
              </select>

              <input placeholder="Valor por unidad" type="number" value={nuevaTarifa.valorUnidad} onChange={(e) => setNuevaTarifa({ ...nuevaTarifa, valorUnidad: e.target.value })} />
              <button type="submit">Guardar tarifa</button>
            </form>

            <div className="list-grid">
              {tarifas.map((t) => (
                <div className="info-card" key={t.id}>
                  <strong>{t.tipoProceso}</strong>
                  <span>Valor por unidad: {t.valorUnidad}</span>
                </div>
              ))}
            </div>

            <h3 className="section-title">Registrar trabajo realizado</h3>
            <form className="modern-form" onSubmit={registrarTrabajoNomina}>
              <select value={nuevoTrabajo.empleadoId} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, empleadoId: e.target.value })}>
                <option value="">Seleccione un empleado</option>
                {empleados.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre} - {e.procesoPrincipal}
                  </option>
                ))}
              </select>

              <select value={nuevoTrabajo.ordenProduccionId} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, ordenProduccionId: e.target.value })}>
                <option value="">Seleccione una orden</option>
                {ordenes.map((o) => (
                  <option key={o.id} value={o.id}>
                    Orden #{o.id} - {mapaProductos[o.productoId] || `Producto ${o.productoId}`}
                  </option>
                ))}
              </select>

              <input placeholder="Unidades trabajadas" type="number" value={nuevoTrabajo.unidadesTrabajadas} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, unidadesTrabajadas: e.target.value })} />
              <input placeholder="Observaciones" value={nuevoTrabajo.observaciones} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, observaciones: e.target.value })} />
              <button type="submit">Registrar trabajo</button>
            </form>

            {empleadoSeleccionadoNomina && (
              <div className="cost-box small-box">
                <p><strong>Proceso detectado:</strong> {empleadoSeleccionadoNomina.procesoPrincipal}</p>
              </div>
            )}

            <h3 className="section-title">Resumen por empleado</h3>
            <form className="modern-form" onSubmit={consultarResumenEmpleado}>
              <select value={resumenEmpleadoId} onChange={(e) => setResumenEmpleadoId(e.target.value)}>
                <option value="">Seleccione un empleado</option>
                {empleados.map((e) => (
                  <option key={e.id} value={e.id}>{e.nombre}</option>
                ))}
              </select>

              <button type="submit">Ver resumen</button>
            </form>

            {resumenEmpleado && (
              <div className="cost-box">
                <h3>{resumenEmpleado.empleadoNombre}</h3>
                <p>Total unidades: {resumenEmpleado.totalUnidades}</p>
                <p className="highlight">Total pago: {resumenEmpleado.totalPago}</p>

                <div className="list-grid">
                  {resumenEmpleado.detalles.map((d) => (
                    <div className="info-card" key={d.id}>
                      <strong>{d.tipoProceso}</strong>
                      <span>Orden: #{d.ordenProduccionId}</span>
                      <span>Unidades: {d.unidadesTrabajadas}</span>
                      <span>Valor unidad: {d.valorUnidadAplicado}</span>
                      <span>Pago: {d.pagoCalculado}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="section-title">Costo de mano de obra por orden</h3>
            <form className="modern-form" onSubmit={consultarCostoManoObra}>
              <select value={manoObraOrdenId} onChange={(e) => setManoObraOrdenId(e.target.value)}>
                <option value="">Seleccione una orden</option>
                {ordenes.map((o) => (
                  <option key={o.id} value={o.id}>
                    Orden #{o.id} - {mapaProductos[o.productoId] || `Producto ${o.productoId}`}
                  </option>
                ))}
              </select>

              <button type="submit">Ver mano de obra</button>
            </form>

            {costoManoObraOrden && (
              <div className="cost-box">
                <h3>Orden #{costoManoObraOrden.ordenProduccionId}</h3>
                <p>Total unidades: {costoManoObraOrden.totalUnidades}</p>
                <p className="highlight">Total mano de obra: {costoManoObraOrden.totalPago}</p>

                <div className="list-grid">
                  {costoManoObraOrden.detalles.map((d) => (
                    <div className="info-card" key={d.id}>
                      <strong>{d.empleadoNombre}</strong>
                      <span>Proceso: {d.tipoProceso}</span>
                      <span>Unidades: {d.unidadesTrabajadas}</span>
                      <span>Pago: {d.pagoCalculado}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="section-title">Registros recientes</h3>
            <div className="list-grid">
              {trabajos.map((t) => (
                <div className="info-card" key={t.id}>
                  <strong>{t.empleadoNombre}</strong>
                  <span>Proceso: {t.tipoProceso}</span>
                  <span>Orden: #{t.ordenProduccionId}</span>
                  <span>Unidades: {t.unidadesTrabajadas}</span>
                  <span>Pago: {t.pagoCalculado}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "clientes" && (
          <section className="panel">
            <h2>Clientes</h2>
            <p className="subtitulo">Registro y consulta de clientes</p>

            <form className="modern-form" onSubmit={crearCliente}>
              <input placeholder="Nombre del cliente" value={nuevoCliente.nombre} onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} />
              <input placeholder="Identificación" value={nuevoCliente.identificacion} onChange={(e) => setNuevoCliente({ ...nuevoCliente, identificacion: e.target.value })} />
              <input placeholder="Teléfono" value={nuevoCliente.telefono} onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })} />
              <input placeholder="Correo electrónico" value={nuevoCliente.email} onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })} />
              <input placeholder="Dirección" value={nuevoCliente.direccion} onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })} />
              <button type="submit">Guardar cliente</button>
            </form>

            <div className="list-grid">
              {clientes.map((c) => (
                <div className="info-card" key={c.id}>
                  <strong>{c.nombre}</strong>
                  <span>Identificación: {c.identificacion}</span>
                  <span>Teléfono: {c.telefono}</span>
                  <span>Correo: {c.email}</span>
                  <span>Dirección: {c.direccion}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "pedidos" && (
          <section className="panel">
            <h2>Pedidos</h2>
            <p className="subtitulo">Gestión de pedidos de clientes</p>

            <h3 className="section-title">Crear pedido</h3>
            <form className="modern-form" onSubmit={crearPedido}>
              <select value={nuevoPedido.clienteId} onChange={(e) => setNuevoPedido({ ...nuevoPedido, clienteId: e.target.value })}>
                <option value="">Seleccione un cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>

              <input placeholder="Observaciones del pedido" value={nuevoPedido.observaciones} onChange={(e) => setNuevoPedido({ ...nuevoPedido, observaciones: e.target.value })} />
              <button type="submit">Guardar pedido</button>
            </form>

            <h3 className="section-title">Agregar detalle al pedido</h3>
            <form className="modern-form" onSubmit={agregarDetallePedido}>
              <select value={detallePedido.productoId} onChange={(e) => setDetallePedido({ ...detallePedido, productoId: e.target.value })}>
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.referencia ? `- ${p.referencia}` : ""}
                  </option>
                ))}
              </select>

              <input placeholder="Cantidad" type="number" value={detallePedido.cantidad} onChange={(e) => setDetallePedido({ ...detallePedido, cantidad: e.target.value })} />
              <input placeholder="Talla" value={detallePedido.talla} onChange={(e) => setDetallePedido({ ...detallePedido, talla: e.target.value })} />
              <input placeholder="Observaciones" value={detallePedido.observaciones} onChange={(e) => setDetallePedido({ ...detallePedido, observaciones: e.target.value })} />
              <button type="submit">Agregar detalle</button>
            </form>

            {detallesPedido.length > 0 && (
              <>
                <h3 className="section-title">Detalle temporal del pedido</h3>
                <div className="list-grid">
                  {detallesPedido.map((d, index) => (
                    <div className="info-card" key={index}>
                      <strong>{mapaProductos[d.productoId] || `Producto ${d.productoId}`}</strong>
                      <span>Cantidad: {d.cantidad}</span>
                      <span>Talla: {d.talla || "No especificada"}</span>
                      <span>Observaciones: {d.observaciones || "Ninguna"}</span>
                      <div className="action-row">
                        <button type="button" onClick={() => eliminarDetallePedido(index)}>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h3 className="section-title">Consultar detalles de pedido</h3>
            <form className="modern-form" onSubmit={consultarDetallesPedido}>
              <select value={pedidoConsultaId} onChange={(e) => setPedidoConsultaId(e.target.value)}>
                <option value="">Seleccione un pedido</option>
                {pedidos.map((p) => (
                  <option key={p.id} value={p.id}>
                    Pedido #{p.id} - {mapaClientes[p.clienteId] || `Cliente ${p.clienteId}`}
                  </option>
                ))}
              </select>

              <button type="submit">Ver detalles</button>
            </form>

            {detallesPedidoConsultado.length > 0 && (
              <div className="list-grid">
                {detallesPedidoConsultado.map((d) => (
                  <div className="info-card" key={d.id}>
                    <strong>{mapaProductos[d.productoId] || `Producto ${d.productoId}`}</strong>
                    <span>Cantidad: {d.cantidad}</span>
                    <span>Talla: {d.talla || "No especificada"}</span>
                    <span>Observaciones: {d.observaciones || "Ninguna"}</span>
                  </div>
                ))}
              </div>
            )}

            <h3 className="section-title">Actualizar estado de pedido</h3>
            <form className="modern-form" onSubmit={actualizarEstadoPedido}>
              <select value={pedidoEstadoId} onChange={(e) => setPedidoEstadoId(e.target.value)}>
                <option value="">Seleccione un pedido</option>
                {pedidos.map((p) => (
                  <option key={p.id} value={p.id}>
                    Pedido #{p.id} - {mapaClientes[p.clienteId] || `Cliente ${p.clienteId}`}
                  </option>
                ))}
              </select>

              <select value={nuevoEstadoPedido} onChange={(e) => setNuevoEstadoPedido(e.target.value)}>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN_PRODUCCION">EN_PRODUCCION</option>
                <option value="LISTO">LISTO</option>
                <option value="DESPACHADO">DESPACHADO</option>
              </select>

              <button type="submit">Actualizar estado</button>
            </form>

            <h3 className="section-title">Pedidos registrados</h3>
            <div className="list-grid">
              {pedidos.map((p) => (
                <div className="info-card" key={p.id}>
                  <strong>Pedido #{p.id}</strong>
                  <span>Cliente: {mapaClientes[p.clienteId] || `Cliente ${p.clienteId}`}</span>
                  <span>Estado: {p.estado}</span>
                  <span>Observaciones: {p.observaciones || "Ninguna"}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {vista === "despachos" && (
          <section className="panel">
            <h2>Despachos</h2>
            <p className="subtitulo">Control de salida y entrega de pedidos</p>

            <h3 className="section-title">Registrar despacho</h3>
            <form className="modern-form" onSubmit={registrarDespacho}>
              <select value={nuevoDespacho.pedidoId} onChange={(e) => setNuevoDespacho({ ...nuevoDespacho, pedidoId: e.target.value })}>
                <option value="">Seleccione un pedido LISTO</option>
                {pedidos
                  .filter((p) => p.estado === "LISTO")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      Pedido #{p.id} - {mapaClientes[p.clienteId] || `Cliente ${p.clienteId}`}
                    </option>
                  ))}
              </select>

              <input placeholder="Transporte" value={nuevoDespacho.transporte} onChange={(e) => setNuevoDespacho({ ...nuevoDespacho, transporte: e.target.value })} />
              <input placeholder="Destinatario" value={nuevoDespacho.destinatario} onChange={(e) => setNuevoDespacho({ ...nuevoDespacho, destinatario: e.target.value })} />
              <input placeholder="Responsable" value={nuevoDespacho.responsable} onChange={(e) => setNuevoDespacho({ ...nuevoDespacho, responsable: e.target.value })} />
              <input placeholder="Observaciones" value={nuevoDespacho.observaciones} onChange={(e) => setNuevoDespacho({ ...nuevoDespacho, observaciones: e.target.value })} />
              <button type="submit">Registrar despacho</button>
            </form>

            <h3 className="section-title">Consultar despacho por pedido</h3>
            <form className="modern-form" onSubmit={consultarDespachoPedido}>
              <select value={pedidoDespachoConsultaId} onChange={(e) => setPedidoDespachoConsultaId(e.target.value)}>
                <option value="">Seleccione un pedido</option>
                {pedidos.map((p) => (
                  <option key={p.id} value={p.id}>
                    Pedido #{p.id} - {mapaClientes[p.clienteId] || `Cliente ${p.clienteId}`}
                  </option>
                ))}
              </select>

              <button type="submit">Consultar despacho</button>
            </form>

            {despachoConsultado && (
              <div className="cost-box">
                <h3>Despacho del pedido #{despachoConsultado.pedidoId}</h3>
                <p>Fecha: {despachoConsultado.fechaDespacho}</p>
                <p>Transporte: {despachoConsultado.transporte}</p>
                <p>Destinatario: {despachoConsultado.destinatario}</p>
                <p>Responsable: {despachoConsultado.responsable}</p>
                <p>Observaciones: {despachoConsultado.observaciones || "Ninguna"}</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;