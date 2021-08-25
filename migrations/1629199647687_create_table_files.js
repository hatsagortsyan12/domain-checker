module.exports = {
  "up": "CREATE TABLE IF NOT EXISTS `processes` (\
    `id` INT NOT NULL AUTO_INCREMENT,\
    `status` varchar(128) NOT NULL,\
    `result` longtext,\
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,\
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
    PRIMARY KEY (id),\
    INDEX (status)\
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
  "down": "DROP TABLE `processes`"
}