/**
 * Created by zeng on 15-8-5.
 */

module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '*//*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> *//*\n'
            },
            build: {
                src: 'src/<%=pkg.file %>.js',
                dest: 'dest/<%= pkg.file %>.min.js'
            }
        }

    });
    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认任务
    grunt.registerTask('default', ['uglify']);

}

module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/zepto.js', 'src/underscore-min.js', 'src/backbone-min.js'],
                dest: 'dest/libs.js'
            }
        },
        uglify: {
            build: {
                src: 'dest/libs.js',
                dest: 'dest/libs.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 默认任务
    grunt.registerTask('default', ['concat', 'uglify']);

}

module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            "my_target": {
                "files": {
                    'dest/test.min.js': ['src/a.js', 'src/b.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认任务
    grunt.registerTask('default', ['uglify']);
}