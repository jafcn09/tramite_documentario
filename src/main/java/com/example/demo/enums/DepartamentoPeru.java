package com.example.demo.enums;

public enum DepartamentoPeru {

    AMAZONAS("Amazonas", "AM", "01"),
    ANCASH("Áncash", "AN", "02"),
    APURIMAC("Apurímac", "AP", "03"),
    AREQUIPA("Arequipa", "AR", "04"),
    AYACUCHO("Ayacucho", "AY", "05"),
    CAJAMARCA("Cajamarca", "CA", "06"),
    CALLAO("Callao", "CL", "07"),
    CUSCO("Cusco", "CU", "08"),
    HUANCAVELICA("Huancavelica", "HV", "09"),
    HUANUCO("Huánuco", "HU", "10"),
    ICA("Ica", "IC", "11"),
    JUNIN("Junín", "JU", "12"),
    LA_LIBERTAD("La Libertad", "LL", "13"),
    LAMBAYEQUE("Lambayeque", "LA", "14"),
    LIMA("Lima", "LI", "15"),
    LORETO("Loreto", "LO", "16"),
    MADRE_DE_DIOS("Madre de Dios", "MD", "17"),
    MOQUEGUA("Moquegua", "MO", "18"),
    PASCO("Pasco", "PA", "19"),
    PIURA("Piura", "PI", "20"),
    PUNO("Puno", "PU", "21"),
    SAN_MARTIN("San Martín", "SM", "22"),
    TACNA("Tacna", "TA", "23"),
    TUMBES("Tumbes", "TU", "24"),
    UCAYALI("Ucayali", "UC", "25");

    private final String nombre;
    private final String codigo;
    private final String ubigeo;

    DepartamentoPeru(String nombre, String codigo, String ubigeo) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.ubigeo = ubigeo;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getUbigeo() {
        return ubigeo;
    }

    /**
     * Busca un departamento por su nombre
     * @param nombre El nombre del departamento
     * @return El DepartamentoPeru correspondiente o null si no se encuentra
     */
    public static DepartamentoPeru fromNombre(String nombre) {
        if (nombre == null) {
            return null;
        }

        for (DepartamentoPeru depto : DepartamentoPeru.values()) {
            if (depto.getNombre().equalsIgnoreCase(nombre.trim())) {
                return depto;
            }
        }
        return null;
    }

    /**
     * Busca un departamento por su código
     * @param codigo El código del departamento
     * @return El DepartamentoPeru correspondiente o null si no se encuentra
     */
    public static DepartamentoPeru fromCodigo(String codigo) {
        if (codigo == null) {
            return null;
        }

        for (DepartamentoPeru depto : DepartamentoPeru.values()) {
            if (depto.getCodigo().equalsIgnoreCase(codigo.trim())) {
                return depto;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return nombre;
    }
}