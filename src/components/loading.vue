<template>
    <div class="loading" :style="{'margin-top': top || '30px'}">
        <div class="lines">
            <span class="line_1"></span>
            <span class="line_2"></span>
            <span class="line_3"></span>
            <span class="line_4"></span>
        </div>
        <div class="word">加载中</div>
    </div>
</template>

<script>
export default {
  props: {
    top: String
  }
}
</script>

<style lang="less" scoped>
.loading {
    text-align: center;

    .lines span {
        margin: 0 3px;
        width: 2px;
        height: 20px;
        background: #ee3a23;

        &.line_1 {
            animation: line_1 1s ease infinite alternate;
        }

        &.line_2 {
            animation: line_2 1s ease infinite alternate;
        }

        &.line_3 {
            animation: line_3 1s ease infinite alternate;
        }

        &.line_4 {
            animation: line_4 1s ease infinite alternate;
        }
    }

    .word {
        font-size: 12px;
        letter-spacing: 1px;
        color: #666;
    }
}

@keyframes line_1 {
    from {
        transform: scaleY(0.5)
    }

    to {
        transform: scaleY(1)
    }
}

@keyframes line_2 {
    from {
        transform: scaleY(1.1)
    }

    to {
        transform: scaleY(.6)
    }
}

@keyframes line_3 {
    from {
        transform: scaleY(0.4)
    }

    to {
        transform: scaleY(.9)
    }
}

@keyframes line_4 {
    from {
        transform: scaleY(1)
    }

    to {
        transform: scaleY(.4)
    }
}
</style>