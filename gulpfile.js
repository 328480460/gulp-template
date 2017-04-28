/**
 * @file gulpfile
 * @version 1.0
 * @author ollie
 */

// Load plugins
var gulp = require('gulp'),
    less = require('gulp-less'),//引入less模块
    cleanCSS = require('gulp-clean-css'),//
    notify = require('gulp-notify'),//引入提示模块
    autoprefixer = require('gulp-autoprefixer'),//引入自动补全代码模块
    watch = require('gulp-watch'),//引入监听模块
    path = require('path'), //引入路径模块
    fs = require('fs-extra'),
    concat = require('gulp-concat'),//引入js合并模块
    spritesmith=require('gulp.spritesmith'), //引入自动合并雪碧图模块
    connect = require('gulp-connect');//引入gulp链接实现自动刷新模块 
// Build css

var importURL = path.join(__dirname, 'less', 'import');
//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        host : '', //地址，可不写，不写的话，默认localhost
        port : '', //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true //自动刷新
    });
});
gulp.task('html', function () {
    gulp.src('./*.html')
    .pipe(connect.reload());
});

//多个js合并,
/*gulp.task('testConcat', function () {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});*/

gulp.task('build-css', function() {
    gulp.src('less/*.less')
        .pipe(less({
            paths: [importURL]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions','Android >= 4.0'], //兼容主流浏览器的最新2个版本,Android4.0以上
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            keepBreaks:true
        }))
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'build-css task complete'
        }));
});

//执行 gulp build 打包项目
gulp.task('build', function() {
    /*var targetName=__dirname.substring(14)+'_production';
    var target ='../'+targetName;*/
    var targetParentName = path.resolve(__dirname, '..'); //获取当前目录的父级目录
    var targetSonName = __dirname.replace(targetParentName,''); //获取当前目录
    var target = targetParentName +'/' + targetSonName +'_production';
    fs.ensureDir(target, function (err) {
      console.log(err);
    })
    fs.copy('./images', target+'/images', function (err) {
      if (err) return console.error(err)
      console.log("复制图片成功！");
    });
    fs.copy('./css', target+'/css', function (err) {
      if (err) return console.error(err)
      console.log("复制css成功！");
    });
    fs.copy('./js', target+'/js', function (err) {
      if (err) return console.error(err)
      console.log("复制js成功！");
    });
    gulp.src('./*html')
        .pipe(gulp.dest(target))
        .pipe(notify({
            message: '打包成功!'
        }));

});
//执行 gulp watch 开发环境
gulp.task('watch', function() {
    gulp.watch('./less/**/*.less', ['build-css']); //监控less文件
    gulp.watch('./css/**/*.css', ['html']); //监控css文件
    gulp.watch('./js/**/*.js', ['html']);  //监控js文件
    gulp.watch(['./*.html'], ['html']);  //监控html文件
});

//执行gulp server开启服务器
gulp.task('server', ['connect', 'watch']);

//执行 gulp sripte 合并目标雪碧图
gulp.task('sprite', function () {

    return gulp.src('images/icon/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/sprite.css',//保存合并后对于css样式的地址
            padding:10,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate: function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url('"+sprite.escaped_image+"');"+
                    "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }

        }))
        .pipe(gulp.dest('dist/'));
});