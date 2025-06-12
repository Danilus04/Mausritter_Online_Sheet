  -- MySQL Workbench Forward Engineering

  SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
  SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
  SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

  CREATE SCHEMA IF NOT EXISTS `mydb` ;
  USE `mydb` ;

  -- Tabela de Usuários
  CREATE TABLE IF NOT EXISTS `mydb`.`User` (
    `idUser` INT NOT NULL AUTO_INCREMENT,
    `nameUser` VARCHAR(45) NULL,
    `passwordUser` VARCHAR(200) NULL,
    PRIMARY KEY (`idUser`)
  ) ENGINE = InnoDB;

  -- Tabela de Personagens
  CREATE TABLE IF NOT EXISTS `mydb`.`Character` (
    `idCharacter` INT NOT NULL AUTO_INCREMENT,
    `nameCharacter` VARCHAR(45) NULL,
    `backgroundCharacter` VARCHAR(45) NULL,
    `birthsignCharacter` VARCHAR(45) NULL,
    `coatCharacter` VARCHAR(45) NULL,
    `lookCharacter` VARCHAR(45) NULL,
    `strCurrentCharacter` INT NULL,
    `dexCurrentCharacter` INT NULL,
    `willCurrentCharacter` INT NULL,
    `strMaxCharacter` INT NULL,
    `dexMaxCharacter` INT NULL,
    `willMaxCharacter` INT NULL,
    `hpCurrentCharacter` INT NULL,
    `hpMaxCharacter` INT NULL,
    `pipsCharacter` INT NULL,
    `levelCharacter` INT NULL,
    `xpCharacter` INT NULL,
    `gritCharacter` INT NULL,
    `User_idUser` INT NOT NULL,
    PRIMARY KEY (`idCharacter`),
    INDEX `fk_Character_User_idx` (`User_idUser` ASC),
    CONSTRAINT `fk_Character_User`
      FOREIGN KEY (`User_idUser`)
      REFERENCES `mydb`.`User` (`idUser`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  ) ENGINE = InnoDB;

  -- Tabela de Itens (Square)
  CREATE TABLE IF NOT EXISTS `mydb`.`Square` (
    `idSquare` INT NOT NULL AUTO_INCREMENT,
    `nameSquare` VARCHAR(100) NOT NULL,
    `colorSquare` VARCHAR(45) NULL,
    `widthSquare` INT NULL,
    `heightSquare` INT NULL,
    `descriptionSquare` TEXT NULL,
    `effectDescription` TEXT NULL,
    `typeSquare` VARCHAR(45) NULL,
    `imageSquare` TEXT NULL,
    `worthSquare` INT NULL,
    `currentUsageSquare` INT NULL,
    `maxUsageSquare` INT NULL,
    `tagSquare` VARCHAR(45) NULL,
    `damage1Square` VARCHAR(10) NULL,
    `damage2Square` VARCHAR(10) NULL,
    `valueArmorSquare` INT NULL,
    `conditionEffectSquare` VARCHAR(100) NULL,
    `usageTypeSquare` VARCHAR(45) NULL,
    `isMagical` BOOLEAN DEFAULT FALSE,
    `pesoSquare` INT NULL,
    `User_idUser` INT NOT NULL,
    PRIMARY KEY (`idSquare`),
    INDEX `fk_Square_User1_idx` (`User_idUser` ASC),
    CONSTRAINT `fk_Square_User1`
      FOREIGN KEY (`User_idUser`)
      REFERENCES `mydb`.`User` (`idUser`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  ) ENGINE = InnoDB;

  -- Relacionamento Personagem ↔ Item
  CREATE TABLE IF NOT EXISTS `mydb`.`Character_has_Square` (
    `Character_idCharacter` INT NOT NULL,
    `Square_idSquare` INT NOT NULL,
    PRIMARY KEY (`Character_idCharacter`, `Square_idSquare`),
    INDEX `fk_Character_has_Square_Square1_idx` (`Square_idSquare` ASC),
    INDEX `fk_Character_has_Square_Character1_idx` (`Character_idCharacter` ASC),
    CONSTRAINT `fk_Character_has_Square_Character1`
      FOREIGN KEY (`Character_idCharacter`)
      REFERENCES `mydb`.`Character` (`idCharacter`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `fk_Character_has_Square_Square1`
      FOREIGN KEY (`Square_idSquare`)
      REFERENCES `mydb`.`Square` (`idSquare`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  ) ENGINE = InnoDB;

  SET SQL_MODE=@OLD_SQL_MODE;
  SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
  SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
