

 class Queryss {

    constructor(){
        console.log("se creo una clase.");
    };

    Eliminar_Tablas_Model(){

        var consulta="";

        consulta+="USE practica1; SET FOREIGN_KEY_CHECKS = 0;\
        DROP TABLE IF EXISTS Region,Ciudad,Cliente,Proveedor,Compania,Orden,Compra,Categoria,Producto,DetalleOrden,DetalleCompra;\
        SET FOREIGN_KEY_CHECKS = 1;";

        return consulta;

    }

    Eliminar_Datos_Temporal(){

        var consulta="";

        consulta+="drop table if exists Temporal";

        return consulta;
    }

   

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
        codigo_postal int(30) not null,\
        region varchar(50) not null,\
        producto varchar(50),\
        categoria_producto varchar(50),\
        cantidad int not null,\
        precio_unitario decimal(19,2) not null\
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

           /* consulta+="SET FOREIGN_KEY_CHECKS = 0;\
                DROP TABLE IF EXISTS Region,Ciudad,Cliente,Proveedor,Compania,Orden,Compra,Categoria,Producto,DetalleOrden,DetalleCompra;\
                SET FOREIGN_KEY_CHECKS = 1;";*/

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
                    Codigo_Postal INT(30) NOT NULL,\
                    Nombre_Ciudad VARCHAR(50) NOT NULL,\
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
                    Telefono_Cliente VARCHAR(15) NOT NULL,\
                    Nombre_Cliente VARCHAR(50) NOT NULL,\
                    Correo_Cliente VARCHAR(50) NOT NULL,\
                    Fecha_Registro_Cliente DATE NOT NULL,\
                    Direccion_Cliente VARCHAR(50) NOT NULL,\
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
                    Telefono_Proveedor VARCHAR(15) NOT NULL,\
                    Nombre_Proveedor VARCHAR(50) NOT NULL,\
                    Correo_Proveedor VARCHAR(50) NOT NULL,\
                    Fecha_Registro_Proveedor DATE NOT NULL,\
                    Direccion_Proveedor VARCHAR(50) NOT NULL,\
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
                    Correo_Compania VARCHAR(50) NOT NULL,\
                    PRIMARY KEY (Telefono_Compania))\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS Categoria (\
                        Id_Categoria INT NOT NULL AUTO_INCREMENT,\
                        Nombre_Categoria VARCHAR(45) NOT NULL,\
                        PRIMARY KEY (Id_Categoria))\
                        ENGINE = InnoDB CHARACTER SET latin1; \n ";
    
                consulta+="CREATE TABLE IF NOT EXISTS Producto (\
                        Id_Producto INT NOT NULL AUTO_INCREMENT,\
                        Nombre_Producto VARCHAR(45) NOT NULL,\
                        Precio_Unitario DECIMAL(19,2) NOT NULL,\
                        Id_Categoria INT NOT NULL,\
                        PRIMARY KEY (Id_Producto),\
                        INDEX fk_Producto_Categoria1_idx (Id_Categoria ASC) VISIBLE,\
                        CONSTRAINT fk_Producto_Categoria1\
                            FOREIGN KEY (Id_Categoria)\
                            REFERENCES Categoria (Id_Categoria)\
                            ON DELETE NO ACTION\
                            ON UPDATE NO ACTION)\
                        ENGINE = InnoDB CHARACTER SET latin1; \n ";
                
                consulta+="CREATE TABLE IF NOT EXISTS Orden (\
                    Id_Orden INT NOT NULL AUTO_INCREMENT,\
                    Telefono_Proveedor VARCHAR(20) NOT NULL,\
                    Telefono_Compania VARCHAR(20) NOT NULL,\
                    PRIMARY KEY (Id_Orden),\
                    INDEX fk_Orden_Proveedor1_idx (Telefono_Proveedor ASC) VISIBLE,\
                    INDEX fk_Orden_Compania1_idx (Telefono_Compania ASC) VISIBLE,\
                    CONSTRAINT fk_Orden_Proveedor1\
                      FOREIGN KEY (Telefono_Proveedor)\
                      REFERENCES Proveedor (Telefono_Proveedor)\
                      ON DELETE NO ACTION\
                      ON UPDATE NO ACTION,\
                    CONSTRAINT fk_Orden_Compania1\
                      FOREIGN KEY (Telefono_Compania)\
                      REFERENCES Compania (Telefono_Compania)\
                      ON DELETE NO ACTION\
                      ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";


                consulta+="CREATE TABLE IF NOT EXISTS Compra (\
                    Id_Compra INT NOT NULL AUTO_INCREMENT,\
                    Telefono_Cliente VARCHAR(20) NOT NULL,\
                    Telefono_Compania VARCHAR(20) NOT NULL,\
                    PRIMARY KEY (Id_Compra),\
                    INDEX fk_Compra_Cliente1_idx (Telefono_Cliente ASC) VISIBLE,\
                    INDEX fk_Compra_Compania1_idx (Telefono_Compania ASC) VISIBLE,\
                    CONSTRAINT fk_Compra_Cliente1\
                      FOREIGN KEY (Telefono_Cliente)\
                      REFERENCES Cliente (Telefono_Cliente)\
                      ON DELETE NO ACTION\
                      ON UPDATE NO ACTION,\
                    CONSTRAINT fk_Compra_Compania1\
                      FOREIGN KEY (Telefono_Compania)\
                      REFERENCES Compania (Telefono_Compania)\
                      ON DELETE NO ACTION\
                      ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";
                
                consulta+="CREATE TABLE IF NOT EXISTS DetalleOrden (\
                    Id_detalle_orden INT NOT NULL AUTO_INCREMENT,\
                    Cantidad_Venta INT NOT NULL,\
                    Id_Orden INT NOT NULL,\
                    Id_Producto INT NOT NULL,\
                    PRIMARY KEY (Id_detalle_orden),\
                    INDEX fk_DetalleOrden_Orden1_idx (Id_Orden ASC) VISIBLE,\
                    INDEX fk_DetalleOrden_Producto1_idx (Id_Producto ASC) VISIBLE,\
                    CONSTRAINT fk_DetalleOrden_Orden1\
                        FOREIGN KEY (Id_Orden)\
                        REFERENCES Orden (Id_Orden)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION,\
                    CONSTRAINT fk_DetalleOrden_Producto1\
                        FOREIGN KEY (Id_Producto)\
                        REFERENCES Producto (Id_Producto)\
                        ON DELETE NO ACTION\
                        ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="CREATE TABLE IF NOT EXISTS DetalleCompra (\
                    Id_detalle_compra INT NOT NULL AUTO_INCREMENT,\
                    Cantidad_Compra INT NOT NULL,\
                    Id_Compra INT NOT NULL,\
                    Id_Producto INT NOT NULL,\
                    PRIMARY KEY (id_detalle_compra),\
                    INDEX fk_DetalleCompra_Compra1_idx (Id_Compra ASC) VISIBLE,\
                    INDEX fk_DetalleCompra_Producto1_idx (Id_Producto ASC) VISIBLE,\
                    CONSTRAINT fk_DetalleCompra_Compra1\
                      FOREIGN KEY (Id_Compra)\
                      REFERENCES Compra (Id_Compra)\
                      ON DELETE NO ACTION\
                      ON UPDATE NO ACTION,\
                    CONSTRAINT fk_DetalleCompra_Producto1\
                      FOREIGN KEY (Id_Producto)\
                      REFERENCES Producto (Id_Producto)\
                      ON DELETE NO ACTION\
                      ON UPDATE NO ACTION)\
                    ENGINE = InnoDB CHARACTER SET latin1; \n ";

                consulta+="INSERT INTO Region (Nombre_Region)\
                        SELECT DISTINCT region FROM Temporal;\
                        \
                        INSERT INTO Compania(Telefono_Compania,Nombre_Compania,Contacto_Compania,Correo_Compania)\
                        SELECT DISTINCT telefono_compania,nombre_compania,contacto_compania,correo_compania FROM Temporal;\
                        \
                        INSERT INTO Categoria (Nombre_Categoria)\
                        SELECT DISTINCT categoria_producto FROM Temporal;\
                        \
                        INSERT INTO Ciudad (Codigo_Postal,Nombre_Ciudad,Id_Region)\
                        SELECT DISTINCT Temporal.codigo_postal,Temporal.ciudad,Region.Id_Region FROM Temporal,Region WHERE Region.Nombre_Region=Temporal.region;\
                        \
                        INSERT INTO Cliente (Telefono_Cliente,Nombre_Cliente,Correo_Cliente,Fecha_Registro_Cliente,Direccion_Cliente,Codigo_Postal)\
                        SELECT DISTINCT tmp.telefono,tmp.nombre,tmp.correo,tmp.fecha_registro,tmp.direccion,ci.Codigo_Postal FROM Temporal tmp,Ciudad ci WHERE tmp.tipo='C' and ci.Codigo_Postal=tmp.codigo_postal;\
                        \
                        INSERT INTO Proveedor (Telefono_Proveedor,Nombre_Proveedor,Correo_Proveedor,Fecha_Registro_Proveedor,Direccion_Proveedor,Codigo_postal)\
                        SELECT DISTINCT tmp.telefono,tmp.nombre,tmp.correo,tmp.fecha_registro,tmp.direccion,ci.Codigo_Postal FROM Temporal tmp,Ciudad ci WHERE tmp.tipo='P' and ci.Codigo_Postal=tmp.codigo_postal;\
                        \
                        INSERT INTO Producto (Nombre_Producto,Precio_Unitario,Id_Categoria)\
                        SELECT DISTINCT tmp.producto,tmp.precio_unitario,cat.Id_Categoria FROM Temporal tmp,Categoria cat WHERE cat.Nombre_Categoria=tmp.categoria_producto;\
                        \
                        INSERT INTO Orden (Telefono_Proveedor,Telefono_Compania)\
                        SELECT DISTINCT pr.Telefono_Proveedor,cmp.Telefono_Compania FROM Temporal tmp ,Proveedor pr,Compania cmp\
                        WHERE pr.Telefono_Proveedor=tmp.telefono and cmp.Nombre_Compania=tmp.nombre_compania;\
                        \
                        INSERT INTO DetalleOrden (Cantidad_Venta,Id_Orden,Id_Producto)\
                        SELECT DISTINCT tmp.cantidad,ord.Id_Orden,prod.Id_Producto FROM Temporal tmp ,Proveedor pr,Orden ord,Producto prod,Compania cmp\
                        WHERE prod.Nombre_Producto=tmp.producto and pr.Telefono_Proveedor=tmp.telefono and cmp.Nombre_Compania=tmp.nombre_compania \
                        and ord.Telefono_Proveedor=pr.Telefono_Proveedor and ord.Telefono_Compania=cmp.Telefono_Compania;\
                         \
                        INSERT INTO Compra (Telefono_Cliente,Telefono_Compania)\
                        SELECT DISTINCT cli.Telefono_Cliente,cmp.Telefono_Compania FROM Temporal tmp ,Cliente cli,Compania cmp\
                        WHERE cli.Telefono_Cliente=tmp.telefono and cmp.Nombre_Compania=tmp.nombre_compania;\
                        \
                        INSERT INTO DetalleCompra (Cantidad_Compra,Id_Compra,Id_Producto)\
                        SELECT DISTINCT tmp.cantidad,cpra.Id_Compra,prod.Id_Producto FROM Temporal tmp ,Cliente cli,Compra cpra,Producto prod,Compania cmp\
                        WHERE prod.Nombre_Producto=tmp.producto and cli.Telefono_Cliente=tmp.telefono and cmp.Nombre_Compania=tmp.nombre_compania \
                        and cpra.Telefono_Cliente=cli.Telefono_Cliente and cpra.Telefono_Compania=cmp.Telefono_Compania;";
                        
                        /*
                        INSERT INTO Compra (Telefono_Cliente)\
                        SELECT DISTINCT cl.Telefono_Cliente FROM Temporal tmp ,Cliente cl WHERE tmp.tipo='C' and cl.Telefono_Cliente=tmp.telefono;\
                        \
                        INSERT INTO Factura (Id_Orden,Id_Compra,Telefono_Compania)\
                        SELECT DISTINCT ord.Id_Orden,cpra.Id_Compra,comp.Telefono_Compania FROM Temporal tmp ,Orden ord,Compania comp,Compra cpra,Cliente cli,Proveedor prov \
                        WHERE comp.Telefono_Compania=tmp.telefono_compania and tmp.tipo='C' and cli.Telefono_Cliente=tmp.telefono ";*/
                        
                        //WHERE tmp.tipo='P' and Orden.Telefono_Proveedor=tmp.telefono or tmp.tipo='C' and cpr.Telefono_Cliente=tmp.telefono and cp.Telefono_Compania=tmp.telefono  
        return consulta;
    };


    Reporte1(){

        var consulta="";

        consulta+="select prov.Nombre_Proveedor,prov.Telefono_Proveedor,ordd.Id_Orden,sum(deord.Cantidad_Venta * prod.Precio_Unitario) as total \
                from Proveedor prov,Orden ordd,DetalleOrden deord,Producto prod\
                where prov.Telefono_Proveedor=ordd.Telefono_Proveedor and ordd.Id_Orden=deord.Id_Orden and deord.Id_Producto=prod.Id_Producto\
                group by prov.Nombre_Proveedor,prov.Telefono_Proveedor,ordd.Id_Orden\
                order by total desc\
                limit 1;";

        return consulta;
    };

    Reporte2(){

        var consulta="";
        
        consulta+="select cli.Telefono_Cliente,cli.Nombre_Cliente,sum(dcom.Cantidad_Compra) as cantidad,sum(dcom.Cantidad_Compra*prod.Precio_Unitario) as total\
                from Cliente cli,DetalleCompra dcom,Producto prod,Compra cpra\
                where cli.Telefono_Cliente=cpra.Telefono_Cliente and cpra.Id_Compra=dcom.Id_Compra and dcom.Id_Producto=prod.Id_Producto\
                group by cli.Telefono_Cliente,cli.Nombre_Cliente\
                order by cantidad desc\
                limit 1;";

        return consulta;
    };

    Reporte3(){

        var consulta="";

        consulta+="(select prov.Direccion_Proveedor, reg.Nombre_Region,ciu.Nombre_Ciudad ,ciu.Codigo_Postal ,count(ordd.Id_Orden) as total\
                from Proveedor prov,Region reg,Ciudad ciu,Orden ordd\
                where prov.Codigo_Postal=ciu.Codigo_Postal and ciu.Id_Region=reg.Id_Region and prov.Telefono_Proveedor=ordd.Telefono_Proveedor \
                group by  prov.Direccion_Proveedor,reg.Nombre_Region,ciu.Nombre_Ciudad ,ciu.Codigo_Postal \
                order by total desc \
                limit 2) \
                union \
                (select prov.Direccion_Proveedor, reg.Nombre_Region,ciu.Nombre_Ciudad ,ciu.Codigo_Postal ,count(ordd.Id_Orden) as total \
                from Proveedor prov,Region reg,Ciudad ciu,Orden ordd\
                where prov.Codigo_Postal=ciu.Codigo_Postal and ciu.Id_Region=reg.Id_Region and prov.Telefono_Proveedor=ordd.Telefono_Proveedor \
                group by  prov.Direccion_Proveedor,reg.Nombre_Region,ciu.Nombre_Ciudad ,ciu.Codigo_Postal \
                order by total asc \
                limit 2);";


        return consulta;
    };

    Reporte4(){

        var consulta="";

        consulta+="select cli.Telefono_Cliente,cli.Nombre_Cliente,count(cli.Telefono_Cliente) as ordenes,sum(dcom.Cantidad_Compra) as total,sum(dcom.Cantidad_Compra*prod.Precio_Unitario) as c_total\
            from Cliente cli,Compra cpra,Categoria cate,DetalleCompra dcom,Producto prod\
            where cli.Telefono_Cliente=cpra.Telefono_Cliente and cpra.Id_Compra=dcom.Id_Compra and prod.Id_Producto=dcom.Id_Producto\
            and cate.Id_Categoria=prod.Id_Categoria and cate.Nombre_Categoria=\"Cheese\" \
            group by cli.Telefono_Cliente,cli.Nombre_Cliente\
            order by c_total desc\
            limit 5;";


        return consulta;
    };

    Reporte5(){

        var consulta="";

        consulta+="(select MONTH(cli.Fecha_Registro_Cliente) as Mes,cli.Fecha_Registro_Cliente,cli.Nombre_Cliente,sum(dcom.Cantidad_Compra*prod.Precio_Unitario) as Total ,'mas compra'as Tipo \
                from Cliente cli,DetalleCompra dcom,Producto prod,Compra cpra \
                where dcom.Id_Producto=prod.Id_Producto and dcom.Id_Compra=cpra.Id_Compra and cpra.Telefono_Cliente=cli.Telefono_cliente \
                group by cli.Telefono_Cliente,cli.Fecha_Registro_Cliente \
                order by total desc \
                limit 5) \
                union \
                (select MONTH(cli.Fecha_Registro_Cliente) as Mes,cli.Fecha_Registro_Cliente ,cli.Nombre_Cliente,sum(dcom.Cantidad_Compra*prod.Precio_Unitario) as Total ,'menos compra'as Tipo \
                from Cliente cli,DetalleCompra dcom,Producto prod,Compra cpra \
                where dcom.Id_Producto=prod.Id_Producto and dcom.Id_Compra=cpra.Id_Compra and cpra.Telefono_Cliente=cli.Telefono_cliente \
                group by cli.Telefono_Cliente,cli.Fecha_Registro_Cliente \
                order by total asc  \
                limit 5);";


        return consulta;
    };

    Reporte6(){

        var consulta="";

        consulta+="(select cat.Nombre_Categoria, sum(dcom.Cantidad_Compra*prod.Precio_Unitario) as TotalV_Compra \
                from Categoria cat,Producto prod,DetalleCompra dcom \
                where cat.Id_Categoria=prod.Id_Categoria and prod.Id_Producto=dcom.Id_Producto \
                group by cat.Nombre_Categoria \
                order by TotalV_Compra desc \
                limit 1) \
                union \
                (select cat.Nombre_Categoria, sum(dcom.Cantidad_Compra*prod.Precio_Unitario) as TotalV_Compra \
                from Categoria cat,Producto prod,DetalleCompra dcom \
                where cat.Id_Categoria=prod.Id_Categoria and prod.Id_Producto=dcom.Id_Producto \
                group by cat.Nombre_Categoria \
                order by TotalV_Compra asc \
                limit 1);";


        return consulta;
    };

    Reporte7(){

        var consulta="";

        consulta+="select  prov.Nombre_Proveedor ,cat.Nombre_Categoria ,sum(dord.Cantidad_Venta*prod.Precio_Unitario) as Total_Vendido \
        from Proveedor prov,Categoria cat,Producto prod,DetalleOrden dord,Orden ordd \
        where prov.Telefono_Proveedor=ordd.Telefono_Proveedor and ordd.Id_Orden=dord.Id_Orden and dord.Id_Producto=prod.Id_Producto and prod.Id_Categoria=cat.Id_Categoria and cat.Nombre_Categoria=\"Fresh Vegetables\"\
        group by prov.Nombre_Proveedor,cat.Nombre_Categoria\
        order by Total_Vendido desc\
        limit 5;";


        return consulta;
    };


    Reporte8(){

        var consulta="";

        consulta+="(select cli.Direccion_Cliente,cli.Nombre_Cliente,rg.Nombre_Region,ciu.Nombre_Ciudad,ciu.Codigo_Postal,sum(dcom.Cantidad_Compra*pro.Precio_Unitario) as Total_Compra,'Compra Mas' as Descripcion \
                from Cliente cli,Region rg,Ciudad ciu,DetalleCompra dcom,Compra cpra,Producto pro \
                where rg.Id_Region=ciu.Id_Region and ciu.Codigo_Postal=cli.Codigo_Postal and cli.Telefono_Cliente=cpra.Telefono_Cliente \
                and cpra.Id_Compra=dcom.Id_Compra and pro.Id_Producto=dcom.Id_Producto \
                group by  cli.Direccion_Cliente,cli.Nombre_Cliente,rg.Nombre_Region,ciu.Nombre_Ciudad,ciu.Codigo_Postal \
                order by Total_Compra desc \
                limit 1) \
                union \
                (select cli.Direccion_Cliente,cli.Nombre_Cliente,rg.Nombre_Region,ciu.Nombre_Ciudad,ciu.Codigo_Postal,sum(dcom.Cantidad_Compra*pro.Precio_Unitario) as Total_Compra,'Compra Menos' as Descripcion \
                from Cliente cli,Region rg,Ciudad ciu,DetalleCompra dcom,Compra cpra,Producto pro \
                where rg.Id_Region=ciu.Id_Region and ciu.Codigo_Postal=cli.Codigo_Postal and cli.Telefono_Cliente=cpra.Telefono_Cliente \
                and cpra.Id_Compra=dcom.Id_Compra and pro.Id_Producto=dcom.Id_Producto \
                group by  cli.Direccion_Cliente,cli.Nombre_Cliente,rg.Nombre_Region,ciu.Nombre_Ciudad,ciu.Codigo_Postal \
                order by Total_Compra asc \
                limit 1);";


        return consulta;
    };


    Reporte9(){

        var consulta="";


        return consulta;
    };



    Reporte10(){

        var consulta="";

        consulta+="select cli.Nombre_Cliente , cat.Nombre_Categoria , sum(dcomp.Cantidad_Compra) as Cantidad_Compra \
                from Cliente cli,Producto prod,Categoria cat,DetalleCompra dcomp,Compra cpra \
                where dcomp.Id_Compra=cpra.Id_Compra and cpra.Telefono_Cliente=cli.Telefono_Cliente and dcomp.Id_Producto=prod.Id_Producto \
                and prod.Id_Categoria=cat.Id_Categoria and cat.Nombre_Categoria =\"Seafood\" \
                group by cli.Nombre_Cliente , cat.Nombre_Categoria \
                order by Cantidad_Compra desc \
                limit 10;";


        return consulta;
    };
    

 }
    module.exports= Queryss ;