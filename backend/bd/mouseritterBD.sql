-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `idUser` INT NOT NULL,
  `nameUser` VARCHAR(45) NULL,
  `passwordUser` VARCHAR(200) NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Character`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Character` (
  `idCharacter` INT NOT NULL,
  `nameCharacter` VARCHAR(45) NULL,
  `backgroundCharacter` VARCHAR(45) NULL,
  `birthsignCharacter` VARCHAR(45) NULL,
  `coatCharacter` VARCHAR(45) NULL,
  `lookCharacter` VARCHAR(45) NULL,
  `strCurrentCharacter` VARCHAR(45) NULL,
  `dexCurrentCharacter` VARCHAR(45) NULL,
  `willCurrentCharacter` VARCHAR(45) NULL,
  `strMaxCharacter` VARCHAR(45) NULL,
  `dexMaxCharacter` VARCHAR(45) NULL,
  `willMaxCharacter` VARCHAR(45) NULL,
  `hpCurrentCharacter` VARCHAR(45) NULL,
  `hpCurrentCharacter` VARCHAR(45) NULL,
  `pipsCharacter` VARCHAR(45) NULL,
  `levelCharacter` VARCHAR(45) NULL,
  `xpCharacter` VARCHAR(45) NULL,
  `gritCharacter` VARCHAR(45) NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idCharacter`),
  INDEX `fk_Character_User_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Character_User`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Square`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Square` (
  `idSquare` INT NOT NULL,
  `nameSquare` VARCHAR(45) NULL,
  `colorSquare` VARCHAR(45) NULL,
  `widthSquare` VARCHAR(45) NULL,
  `heightSquare` VARCHAR(45) NULL,
  `descriptionSquare` VARCHAR(45) NULL,
  `typeSquare` VARCHAR(45) NULL,
  `imageSquare` VARCHAR(45) NULL,
  `worthSquare` VARCHAR(45) NULL,
  `currentUsageSquare` VARCHAR(45) NULL,
  `maxUsageSquare` VARCHAR(45) NULL,
  `tagSquare` VARCHAR(45) NULL,
  `damage1Square` VARCHAR(45) NULL,
  `damage2Square` VARCHAR(45) NULL,
  `valueArmorSquare` VARCHAR(45) NULL,
  `conditionEffectSquare` VARCHAR(45) NULL,
  PRIMARY KEY (`idSquare`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Character_has_Square`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Character_has_Square` (
  `Character_idCharacter` INT NOT NULL,
  `Square_idSquare` INT NOT NULL,
  PRIMARY KEY (`Character_idCharacter`, `Square_idSquare`),
  INDEX `fk_Character_has_Square_Square1_idx` (`Square_idSquare` ASC) VISIBLE,
  INDEX `fk_Character_has_Square_Character1_idx` (`Character_idCharacter` ASC) VISIBLE,
  CONSTRAINT `fk_Character_has_Square_Character1`
    FOREIGN KEY (`Character_idCharacter`)
    REFERENCES `mydb`.`Character` (`idCharacter`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Character_has_Square_Square1`
    FOREIGN KEY (`Square_idSquare`)
    REFERENCES `mydb`.`Square` (`idSquare`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
