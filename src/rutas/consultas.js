

 class Queryss {

    constructor(){
        console.log("se creo una clase.");
    };

   

    Get_CargarTemporal(){
        var consulta="";

         consulta=" USE practica1;\
        Create temporary table Temporal(\
        nombre_compania varchar(50) not null,\
        contacto_compania varchar(50) not null,\
        correo_compania varchar(50) not null,\
        telefono_compania varchar(15) not null,\
        tipo char(1) not null,\
        nombre varchar(50) not null,\
        correo varchar(50) not null,\
        telefono varchar(15) not null,\
        fecha_registro date not null,\
        direccion varchar(50) not null,\
        ciudad varchar(50) not null,\
        codigo_postal int,\
        region varchar(50),\
        producto varchar(50),\
        categoria_producto varchar(50),\
        cantidad int not null,\
        precio_unitario decimal(3) not null\
        );\
         LOAD DATA LOCAL INFILE '/home/DataCenterData.csv'\
        INTO TABLE Temporal \
        CHARACTER SET latin1 \
        FIELDS TERMINATED BY  ';' \
        LINES TERMINATED BY '\r\n' \
        IGNORE 1 LINES \
        (nombre_compania, contacto_compania, correo_compania, telefono_compania, tipo, nombre, correo, telefono, @var_fecha, direccion, ciudad, codigo_postal, region, producto, categoria_producto, cantidad, precio_unitario) \
        SET fecha_registro = STR_TO_DATE(@var_fecha, '%d/%m/%Y');";

        return consulta;
    };



    Get_CargarModelo(){
        var consulta="USE practica1;\n";

            consulta+="SET FOREIGN_KEY_CHECKS = 0;\
                DROP TABLE IF EXISTS Region,Ciudad,Cliente,Proveedor,Compania,Orden,Factura,Compra,Categoria,Producto,Detalle;\
                SET FOREIGN_KEY_CHECKS = 1;";

            /*consulta+=" TRUNCATE TABLE  Region;\
                    TRUNCATE  TABLE  Ciudad;\
                    TRUNCATE  TABLE  Cliente;\
                    TRUNCATE  TABLE  Proveedor;\
                    TRUNCATE  TABLE  Compania;\
                    TRUNCATE  TABLE  Orden;\
                    TRUNCATE  TABLE  Factura;\
                    TRUNCATE  TABLE  Compra;\
                    TRUNCATE  TABLE  Categoria;\
                    TRUNCATE  TABLE  Producto;\
                    TRUNCATE  TABLE  Detalle;\n";*/

            consulta+=" CREATE TABLE IF NOT EXISTS Region (\
                        Id_Region INT NOT NULL AUTO_INCREMENT,\
                        Nombre_Region VARCHAR(50) NOT NULL,\
                        PRIMARY KEY (Id_Region))\
                        ENGINE = InnoDB CHARACTER SET latin1; \n ";
            
            consulta+="CREATE TABLE IF NOT EXISTS Ciudad (\
                    Codigo_Postal INT NOT NULL,\
                    Nombre_Ciudad VARCHAR(45) NOT NULL,\
                    Id_Region INT NOT NULL,\
                    PRIMARY KEY (Codigo_Postal),\
                    INDEX fk_Ciudad_Region_idx (Id_Region ASC) VISIBLE,\
                    CONSTRAINT fk_Ciudad_Region\
                        FOREIGN KEY (Id_Region)\
                        REFERENCES Region (Id_Region)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";
                
            consulta+="CREATE TABLE IF NOT EXISTS Cliente (\
                    Telefono_Cliente VARCHAR(20) NOT NULL,\
                    Nombre_Cliente VARCHAR(45) NOT NULL,\
                    Correo_Cliente VARCHAR(45) NOT NULL,\
                    Fecha_Registro_Cliente DATE NOT NULL,\
                    Direccion_Cliente VARCHAR(45) NOT NULL,\
                    Codigo_Postal INT NOT NULL,\
                    PRIMARY KEY (Telefono_Cliente),\
                    INDEX fk_Cliente_Ciudad1_idx (Codigo_Postal ASC) VISIBLE,\
                    CONSTRAINT fk_Cliente_Ciudad1\
                        FOREIGN KEY (Codigo_Postal)\
                        REFERENCES Ciudad (Codigo_Postal)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS Proveedor (\
                    Telefono_Proveedor VARCHAR(20) NOT NULL,\
                    Nombre_Proveedor VARCHAR(45) NOT NULL,\
                    Correo_Proveedor VARCHAR(45) NOT NULL,\
                    Fecha_Registro_Proveedor DATE NOT NULL,\
                    Direccion_Proveedor VARCHAR(45) NOT NULL,\
                    Codigo_Postal INT NOT NULL,\
                    PRIMARY KEY (Telefono_Proveedor),\
                    INDEX fk_Proveedor_Ciudad1_idx (Codigo_Postal ASC) VISIBLE,\
                    CONSTRAINT fk_Proveedor_Ciudad1\
                        FOREIGN KEY (Codigo_Postal)\
                        REFERENCES Ciudad (Codigo_Postal)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS Compania (\
                    Telefono_Compania VARCHAR(20) NOT NULL,\
                    Nombre_Compania VARCHAR(45) NOT NULL,\
                    Contacto_Compania VARCHAR(45) NOT NULL,\
                    Correo_Compania VARCHAR(45) NULL,\
                    PRIMARY KEY (Telefono_Compania))\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";
                
                consulta+="CREATE TABLE IF NOT EXISTS Orden (\
                    Id_Orden INT NOT NULL AUTO_INCREMENT,\
                    Telefono_Proveedor VARCHAR(20) NOT NULL,\
                    PRIMARY KEY (Id_Orden),\
                    INDEX fk_Orden_Proveedor1_idx (Telefono_Proveedor ASC) VISIBLE,\
                    CONSTRAINT fk_Orden_Proveedor1\
                        FOREIGN KEY (Telefono_Proveedor)\
                        REFERENCES Proveedor (Telefono_Proveedor)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS Categoria (\
                    Id_Categoria INT NOT NULL AUTO_INCREMENT,\
                    Nombre_Categoria VARCHAR(45) NOT NULL,\
                    PRIMARY KEY (Id_Categoria))\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS Producto (\
                    Id_Producto INT NOT NULL AUTO_INCREMENT,\
                    Nombre_Producto VARCHAR(45) NOT NULL,\
                    Precio_Unitario DECIMAL(3) NOT NULL,\
                    Id_Categoria INT NOT NULL,\
                    PRIMARY KEY (Id_Producto),\
                    INDEX fk_Producto_Categoria1_idx (Id_Categoria ASC) VISIBLE,\
                    CONSTRAINT fk_Producto_Categoria1\
                        FOREIGN KEY (Id_Categoria)\
                        REFERENCES Categoria (Id_Categoria)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS Compra (\
                    Id_Compra INT NOT NULL,\
                    Telefono_Cliente VARCHAR(20) NOT NULL,\
                    PRIMARY KEY (Id_Compra),\
                    INDEX fk_Compra_Cliente1_idx (Telefono_Cliente ASC) VISIBLE,\
                    CONSTRAINT fk_Compra_Cliente1\
                        FOREIGN KEY (Telefono_Cliente)\
                        REFERENCES Cliente (Telefono_Cliente)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";
                
                consulta+="CREATE TABLE IF NOT EXISTS Factura (\
                    Id_Factura INT NOT NULL AUTO_INCREMENT,\
                    Total INT NOT NULL,\
                    Id_Orden INT NOT NULL,\
                    Id_Compra INT NOT NULL,\
                    Telefono_Compania VARCHAR(20) NOT NULL,\
                    PRIMARY KEY (Id_Factura),\
                    INDEX fk_Factura_Orden1_idx (Id_Orden ASC) VISIBLE,\
                    INDEX fk_Factura_Compra1_idx (Id_Compra ASC) VISIBLE,\
                    INDEX fk_Factura_Compania1_idx (Telefono_Compania ASC) VISIBLE,\
                    CONSTRAINT fk_Factura_Orden1\
                        FOREIGN KEY (Id_Orden)\
                        REFERENCES Orden (Id_Orden)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION,\
                    CONSTRAINT fk_Factura_Compra1\
                        FOREIGN KEY (Id_Compra)\
                        REFERENCES Compra (Id_Compra)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION,\
                    CONSTRAINT fk_Factura_Compania1\
                        FOREIGN KEY (Telefono_Compania)\
                        REFERENCES Compania (Telefono_Compania)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS Detalle (\
                    Id_Detalle INT NOT NULL AUTO_INCREMENT,\
                    Cantidad INT NOT NULL,\
                    Id_Producto INT NOT NULL,\
                    Id_Factura INT NOT NULL,\
                    PRIMARY KEY (Id_Detalle),\
                    INDEX fk_Detalle_Producto1_idx (Id_Producto ASC) VISIBLE,\
                    INDEX fk_Detalle_Factura1_idx (Id_Factura ASC) VISIBLE,\
                    CONSTRAINT fk_Detalle_Producto1\
                        FOREIGN KEY (Id_Producto)\
                        REFERENCES Producto (Id_Producto)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION,\
                    CONSTRAINT fk_Detalle_Factura1\
                        FOREIGN KEY (Id_Factura)\
                        REFERENCES Factura (Id_Factura)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="INSERT INTO Region (Nombre_Region)\
                        SELECT DISTINCT region FROM Temporal;\
                        INSERT INTO Compania (Nombre_Compania,Contacto_Compania,Correo_Compania,Telefono_Compania)\
                        SELECT DISTINCT  (nombre_compania,contacto_compania,correo_compania,telefono_compania) FROM Temporal;\
                        INSERT INTO Categoria (Nombre_Region)\
                        SELECT DISTINCT region FROM Temporal;
                        
                        
                        
                        
                        
                        ";
                        
        return consulta;
    };

 }
    module.exports= Queryss ;